import React, { useEffect, useState } from "react";
import { Container, Typography, Select, MenuItem} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  const urlApiUsers = `http://localhost:3030/api/users/`;
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
    const endpoint = `http://localhost:3030/api/query?q=SELECT distinct(o.id) AS orderId, u.userPicture AS userPicture, u.name AS userName, o.createdAt AS orderDate, o.total AS orderPrice, o.state AS orderEstado FROM users AS u INNER JOIN orders AS o ON u.id = o.userId INNER JOIN orderproducts AS op ON o.id = op.orderId INNER JOIN products AS p ON p.id = op.productId`;
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

    const columnsFormat = [
      { field: "orderId", headerName: "Id", width: 60 },
      // {
      //   field: "userPicture",
      //   headerName: "Imagen",
      //   width: 80,
      //   renderCell: (params) => (
      //     <img
      //       src={`${urlApiUsers}/${params.value}`}
      //       alt="Avatar"
      //       style={{ width: "70%", height: "auto", borderRadius: "50%", 
      //         objectFit: "cover"}}
      //     />
      //   ),
      // },
      // { field: "userName", headerName: "Usuario", width: 200 },
      {
        field: "userName",
        headerName: "Usuario",
        width: 280,
        renderCell: (params) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={`${urlApiUsers}/${params.row.userPicture}`}
              alt={params.value}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            {params.value}
          </div>
        ),
      },
      { field: "orderDate", headerName: "Fecha de orden", width: 200 },
      { field: "orderPrice", headerName: "Total", width: 100 },
      {
        field: "orderEstado",
        headerName: "Estado",
        flex: 1,
        renderCell: (params) => (
          <span
            style={{
              color:
                params.value === "pending"
                  ? "#e67e22"
                  : params.value === "completed"
                  ? "#2ecc71"
                  : "#000000",
            }}
          >
            {params.value}
          </span>
        ),
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Acciones",
        width: 150,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faEye} className="green-icon" />}
            label="Ver"
            onClick={() => handleDetailClick(params)}
          />,
        ],
      },
    ];

    const rowsFormat = [];

    statesOrders.orders.forEach((order, index) => {
      const objData = {
        id: index + 1,
      };
      Object.entries(order).forEach(([key, value]) => {
        objData[key] = value;
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
      <Container sx={{ height: 700, width: "100%" }}>
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "center", mb: 3, color: "#e2001a" }}
        >
          TODOS LAS ORDENES
        </Typography>

        <DataGrid
          rows={dataGrid.rows}
          columns={dataGrid.columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Container>
    </>
  );
};
Orders.propTypes = {};

export default Orders;
