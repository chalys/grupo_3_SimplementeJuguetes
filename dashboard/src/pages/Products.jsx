import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import ConfirmDeleteModal from "../components/Reuse/ConfirmDeleteModal";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showToast } from "../utils/toastr";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const urlProducts = `http://localhost:3030/productos`;
  const urlApiProducts = `http://localhost:3030/api/products`;
  

  const [statesProducts, setStatesProducts] = useState({
    loading: true,
    products: [],
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
    const url = `http://localhost:3030/admin/crear-producto/`;
    window.open(url, "_blank");
  };

  const handleDetailClick = (params) => {
    const url = `${urlProducts}/detalle-producto/` + params.id;
    window.open(url, "_blank");
  };

  const handleEditClick = (params) => {
    const url = `http://localhost:3030/admin/editar-producto/` + params.id;
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
      .delete(`${urlApiProducts}/${itemId}`)
      .then((response) => {
        if (response.data.ok) {
          setStatesProducts((prevState) => ({
            ...prevState,
            products: prevState.products.filter((p) => p.id !== itemId),
          }));
          handleCloseDeleteModal();
          console.log("Producto eliminado con éxito.");
        } else {
          console.error("Error al eliminar el producto:", response.data.msg);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error);
      });
  };
  const handleAddClick = () => {
    // setModalOpen({
    //   open: true,
    //   isEdit: false,
    //   categoryData: [],
    // });
  };
  useEffect(() => {
    const urlApiProducts = "http://localhost:3030/api/products?limit=10000";
    const getProducts = async () => {
      try {
        const {
          ok,
          data = [],
          msg = null,
        } = await fetch(urlApiProducts).then((res) => res.json());

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

    const columnsFormat = [
      { field: "id", headerName: "Id", width: 60 },
      {
        field: "firstImg",
        headerName: "Imagen",
        width: 80,
        renderCell: (params) => (
          <img
            src={`${urlApiProducts}/${params.value}`}
            alt="Producto"
            style={{ width: "100%", height: "auto" }}
          />
        ),
      },

      { field: "name", headerName: "Nombre de Producto", width: 300 },
      { field: "price", headerName: "Precio", width: 100 },
      { field: "description", headerName: "Descripción", flex: 1 },
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

    statesProducts.products.forEach((product) => {
      const objData = {};
      Object.entries(product).forEach(([key, value]) => {
        objData[key] = value;
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
      {/* <Container maxWidth={400} style={{ height: 700 }}> */}
      <Container sx={{ height: 700, width: "100%" }}>
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "center", mb: 3, color: "#e2001a" }}
        >
          TODOS LOS PRODUCTOS
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
          Agregar Producto
        </Button>
        <DataGrid
          rows={dataGrid.rows}
          columns={dataGrid.columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          //pageSizeOptions={[10, 20]}
          pageSizeOptions={[10, 20]}
          slotProps={{
            pagination: {
              next: {
                style: {
                  color: "green",
                },
              },
              back: {
                style: {
                  color: "green",
                },
              },
            },
          }}
        />
      </Container>
      <ConfirmDeleteModal
        open={deleteModal.open}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        item="Producto"
        itemName={deleteModal.itemName}
      />
    </>
  );
};
Products.propTypes = {};

export default Products;