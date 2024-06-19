import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";

const Orders = props => {
  const [statesOrders, setStatesOrders] = useState({
    loading: true,
    orders: [],
    error: "",
  });

  const [dataGrid, setDataGrid] = useState({
    columns: [],
    rows: [],
  });
  useEffect(() => {
    const endpoint = "http://localhost:3030/api/cart/listOrderCompleted?limit=10000";
    const getOrders = async () => {
      try {
        const {
          ok,
          data = [],
          msg = null,
        } = await fetch(endpoint).then((res) => res.json());

        if (!ok) throw new Error(msg);

        ok &&
          setStatesOrders({
            ...statesOrders,
            orders: data,
            loading: false,
          });
      } catch (error) {
        setStatesOrders({
          ...statesOrders,
          error: error.message,
        });
      }
    };

    getOrders();
  }, []);

  useEffect(() => {
    const dataObjOrder = Object.entries(
      statesOrders.orders.length ? statesOrders.orders[0] : {}
    );

    const listWrite = ["id", "products.name", "price", "description"];
    const headerNameTable = {
      id: "ID",
      name: "NOMBRE",
      price: "PRECIO",
      description: "DESCRIPCIÓN",
    };
    const columnsFormat = dataObjOrder
      .filter(([key, value]) => listWrite.includes(key))
      .map(([key, value]) => {
        return {
          field: key,
          headerName: headerNameTable[key],
          width: 200,
          type: typeof value,
          editable: true,
        };
      });

    const rowsFormat = [];

    statesOrders.orders.forEach((order) => {
      const objData = {};
      Object.entries(order).forEach(([key, value]) => {
        if (listWrite.includes(key)) {
          objData[key] = value;
        }
      });
      rowsFormat.push(objData);
    });

    setDataGrid({
      rows: rowsFormat,
      columns: columnsFormat,
    });

    console.log(columnsFormat);
  }, [statesOrders.orders]);

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#e2001a" }}>
        TODAS LAS ORDENES
      </h1>

      <Container maxWidth={400} style={{ height: 400 }}>
        <DataGrid
          rows={dataGrid.rows}
          columns={dataGrid.columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Container>
    </>
  );
};
Orders.propTypes = {}

export default Orders