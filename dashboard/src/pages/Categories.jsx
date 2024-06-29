import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import ConfirmDeleteModal from "../components/Reuse/ConfirmDeleteModal";
import CategoryModal from "../components/Reuse/CategoryModal";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showToast } from "../utils/toastr";
import "react-toastify/dist/ReactToastify.css";

const Categories = () => {
  const urlApiCategories = `http://localhost:3030/api/category`;

  const [statesCategories, setStatesCategories] = useState({
    loading: true,
    categoryData: [],
    error: "",
  });

  const [dataGrid, setDataGrid] = useState({
    columns: [],
    rows: [],
  });

  const [modalOpen, setModalOpen] = useState({
    open: false,
    isEdit: false,
    categoryData: [],
  });

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    itemId: null,
    itemName: "",
  });

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
      .delete(`${urlApiCategories}/${itemId}`)
      .then((response) => {
        if (response.data.ok) {
          setStatesCategories((prevState) => ({
            ...prevState,
            categoryData: prevState.categoryData.filter(
              (category) => category.id !== itemId
            ),
          }));
          handleCloseDeleteModal();
          showToast("success", "Categoría eliminada con éxito.");
        } else {
          showToast("error", "Error eliminando la categoría: " + response.data.msg);
        }
      })
      .catch((error) => {
        showToast("error", "Error eliminando la categoría: " + error.message);
      });
  };

  const handleAddClick = () => {
    setModalOpen({
      open: true,
      isEdit: false,
      categoryData: [],
    });
  };

  const handleEditClick = (params) => {
    setModalOpen({
      open: true,
      isEdit: true,
      categoryData: params.row,
    });
  };

  const handleCloseModal = () => {
    setModalOpen({
      open: false,
      isEdit: false,
      categoryData: [],
    });
  };

  const handleSave = async () => {
    try {
      const endpoint = await axios.get(`${urlApiCategories}?limit=1000`);
      const { ok, data = [], msg = null } = endpoint.data;

      if (!ok) throw new Error(msg);

      setStatesCategories((prevState) => ({
        ...prevState,
        categoryData: data,
      }));
      showToast("success", "Categoría registrada con éxito");
    } catch (error) {
      showToast("error", "Error eliminando la categoría: " + error);      
    }
  };

  useEffect(() => {
    const endpoint = `${urlApiCategories}?limit=1000`;
    const getCategories = async () => {
      try {
        const { ok, data = [], msg = null } = await fetch(endpoint).then((res) => res.json());

        if (!ok) throw new Error(msg);

        setStatesCategories({
          ...statesCategories,
          categoryData: data,
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
    const columnsFormat = [
      { field: "id", headerName: `Id`, width: 60 },
      { field: "name", headerName: `Nombre`, width: 350 },
      { field: "description", headerName: `Descripción`, flex: 1 },
      {
        field: "actions",
        type: "actions",
        headerName: "Acciones",
        width: 150,
        getActions: (params) => [
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

    const rowsFormat = statesCategories.categoryData.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
    }));

    setDataGrid({
      rows: rowsFormat,
      columns: columnsFormat,
    });
  }, [statesCategories.categoryData]);

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
          onClick={handleAddClick}
          sx={{
            mb: 2,
            backgroundColor: "#2d8f2c",
            "&:hover": {
              backgroundColor: "#256b23",
            },
            textTransform: "none",
          }}
          startIcon={<FontAwesomeIcon icon={faPlus} />}
        >
          Agregar Categoría
        </Button>
        <DataGrid
          rows={dataGrid.rows}
          columns={dataGrid.columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10,20]}
        />
      </Container>

      <ConfirmDeleteModal
        open={deleteModal.open}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        item="Categoria"
        itemName={deleteModal.itemName}
      />

      <CategoryModal
        open={modalOpen.open}
        onClose={handleCloseModal}
        isEdit={modalOpen.isEdit}
        categoryData={modalOpen.categoryData}
        onSave={handleSave}
      />
      <ToastContainer />
    </>
  );
};

export default Categories;