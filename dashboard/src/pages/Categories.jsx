import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmDeleteModal from "../components/Reuse/ConfirmDeleteModal";
import axios from "axios";
import "../assets/css/style.css";

const Categories = (props) => {
  const urlCategories = `http://localhost:3030/productos/`;
  const urlApiCategories = `http://localhost:3030/api/category/`;

  const [statesCategories, setStatesCategories] = useState({
    loading: true,
    categories: [],
    error: "",
  });

  const [dataGrid, setDataGrid] = useState({
    columns: [],
    rows: [],
  });

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    itemId: null,
    itemName: "",
  });

  const handleNewClick = () => {
    const url = `${urlApiCategories}crear-categoria/`;
    window.open(url, "_blank");
  };

  const handleDetailClick = (params) => {
    const url = `${urlApiCategories}detalle-categoria/` + params.id;
    window.open(url, "_blank");
  };
  const handleEditClick = (params) => {
    const url = `${urlApiCategories}editar-categoria/` + params.id;
    window.open(url, "_blank");
  };

  const handleDeleteClick = (params) => {
    setDeleteModal({
      open: true,
      itemId: params.id,
      itemName: params.row.name,
    });
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({
      open: false,
      itemId: null,
      itemName: "",
    });
  };

  const handleConfirmDelete = () => {
    const { itemId } = deleteModal;
    axios
      .delete(`http://localhost:3030/api/category/${itemId}`)
      .then((response) => {
        if (response.data.ok) {
          // Eliminar la categoría del estado
          setStatesCategories((prevState) => ({
            ...prevState,
            categories: prevState.categories.filter(
              (category) => category.id !== itemId
            ),
          }));
          handleCloseDeleteModal();
          console.log("Categoría eliminada con éxito.");
        } else {
          console.error("Error eliminando la categoría:", response.data.msg);
        }
      })
      .catch((error) => {
        console.error("Error eliminando la categoría:", error);
      });
  };
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
    const columnsFormat = [
      { field: "id", headerName: "ID", width: 60 },
      { field: "name", headerName: "NOMBRE", width: 350 },
      { field: "description", headerName: "DESCRIPCIÓN", flex: 1 },
      {
        field: "actions",
        type: "actions",
        headerName: "ACCIONES",
        width: 150,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faEye} className="green-icon" />}
            label="Ver"
            onClick={() => handleDetailClick(params)}
          />,
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faEdit} className="blue-icon" />}
            label="Edit"
            onClick={() => handleEditClick(params)}
          />,
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faTrash} className="red-icon" />}
            label="Delete"
            onClick={() => handleDeleteClick(params)}
          />,
        ],
      },
    ];

    const rowsFormat = [];

    statesCategories.categories.forEach((category) => {
      const objData = {};
      Object.entries(category).forEach(([key, value]) => {
        //     if (listWrite.includes(key)) {
        objData[key] = value;
        //   }
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
      <Container sx={{ height: 700, width: "100%" }}>
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "center", mb: 3, color: "#e2001a" }}
        >
          TODAS LAS CATEGORIAS
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleNewClick}
          sx={{
            mb: 2,
            backgroundColor: "#2d8f2c",
            "&:hover": {
              backgroundColor: "#256b23",
            },
          }}
        >
          Agregar Categoría
        </Button>
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
      <ConfirmDeleteModal
        open={deleteModal.open}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        item="Categoria"
        itemName={deleteModal.itemName}
      />
    </>
  );
};

Categories.propTypes = {};

export default Categories;
