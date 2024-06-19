import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";

const Categories = (props) => {
  const [statesCategories, setStatesCategories] = useState({
    loading: true,
    categories: [],
    error: "",
  });

  const [dataGrid, setDataGrid] = useState({
    columns: [],
    rows: [],
  });
  useEffect(() => {
    const endpoint = "http://localhost:3030/api/category?limit=10000";
    const getCategories = async () => {
      try {
        const {
          ok,
          data = [],
          msg = null,
        } = await fetch(endpoint).then((res) => res.json());

        if (!ok) throw new Error(msg);

        ok &&
          setStatesCategories({
            ...statesCategories,
            categories: data,
            loading: false,
          });
      } catch (error) {
        setStatesCategories({
          ...statesCategories,
          error: error.message,
        });
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const dataObjCategory = Object.entries(
      statesCategories.categories.length ? statesCategories.categories[0] : {}
    );

    const listWrite = ["id", "name", "description"];
    const headerNameTable = {
      id: "ID",
      name: "NOMBRE",
      description: "DESCRIPCIÓN",
    };
    const columnsFormat = dataObjCategory
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

    statesCategories.categories.forEach((category) => {
      const objData = {};
      Object.entries(category).forEach(([key, value]) => {
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
  }, [statesCategories.categories]);

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#e2001a" }}>
        TODAS LAS CATEGORIAS
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

Categories.propTypes = {};

export default Categories;
