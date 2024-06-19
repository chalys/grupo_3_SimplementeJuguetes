import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";

const Products = () => {
  const [statesProducts, setStatesProducts] = useState({
    loading: true,
    products: [],
    error: "",
  });

  const [dataGrid, setDataGrid] = useState({
    columns: [],
    rows: [],
  });
  useEffect(() => {
    const endpoint = "http://localhost:3030/api/products?limit=10000";
    const getProducts = async () => {
      try {
        const {
          ok,
          data = [],
          msg = null,
        } = await fetch(endpoint).then((res) => res.json());

        if (!ok) throw new Error(msg);

        ok &&
          setStatesProducts({
            ...statesProducts,
            products: data,
            loading: false,
          });
      } catch (error) {
        setStatesProducts({
          ...statesProducts,
          error: error.message,
        });
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const dataObjProduct = Object.entries(
      statesProducts.products.length ? statesProducts.products[0] : {}
    );

    const listWrite = ["id", "name", "price", "description"];
    const headerNameTable = {
      id: "ID",
      name: "NOMBRE",
      price: "PRECIO",
      description: "DESCRIPCIÓN",
    };
    const columnsFormat = dataObjProduct
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

    statesProducts.products.forEach((product) => {
      const objData = {};
      Object.entries(product).forEach(([key, value]) => {
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
  }, [statesProducts.products]);

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#e2001a" }}>
        TODOS LOS PRODUCTOS
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
Products.propTypes = {};

export default Products;
