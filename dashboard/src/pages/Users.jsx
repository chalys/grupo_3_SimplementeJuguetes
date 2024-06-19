import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";

const Users = (props) => {
  const [statesUsers, setStatesUsers] = useState({
    loading: true,
    users: [],
    error: "",
  });

  const [dataGrid, setDataGrid] = useState({
    columns: [],
    rows: [],
  });

  useEffect(() => {
    const endpoint = "http://localhost:3030/api/users?limit=10000";
    const getUsers = async () => {
      try {
        const {
          ok,
          data = [],
          msg = null,
        } = await fetch(endpoint).then((res) => res.json());

        if (!ok) throw new Error(msg);

        console.log(data);
        ok &&
          setStatesUsers({
            ...statesUsers,
            users: data,
            loading: false,
          });
      } catch (error) {
        setStatesUsers({
          ...statesUsers,
          error: error.message,
        });
      }
    };

    getUsers();
  }, []);
  useEffect(() => {
    const dataObjUser = Object.entries(
      statesUsers.users.length ? statesUsers.users[0] : {}
    );

    const listWrite = ["id", "userName", "email", "name"];
    const headerNameTable = {
      id: "ID",
      userName: "USUARIO",
      email: "CORREO ELECTRÓNICO",
      name: "NOMBRE COMPLETO",
    };
    const columnsFormat = dataObjUser
      .filter(([key, value]) => listWrite.includes(key))
      .map(([key, value]) => {
        return {
          field: key,
          headerName: headerNameTable[key],
          width: 300,
          type: typeof value,
          editable: true,
        };
      });

    const rowsFormat = [];

    statesUsers.users.forEach((user) => {
      const objData = {};
      Object.entries(user).forEach(([key, value]) => {
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
  }, [statesUsers.users]);

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

Users.propTypes = {};

export default Users;
