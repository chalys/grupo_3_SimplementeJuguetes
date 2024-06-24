import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmDeleteModal from "../components/Reuse/ConfirmDeleteModal";
import axios from "axios";
import "../assets/css/style.css";

const Products = () => {
  const urlProducts = `http://localhost:3030/productos/`;
  const urlApiProducts = `http://localhost:3030/api/products/`;

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
    const url = `${urlProducts}detalle-producto/` + params.id;
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
      .delete(`${urlApiProducts}${itemId}`)
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
      { field: "id", headerName: "ID", width: 60 },
      { field: "name", headerName: "NOMBRE", width: 350 },
      { field: "price", headerName: "PRECIO", width: 350 },
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
          onClick={handleNewClick}
          sx={{
            mb: 2,
            backgroundColor: "#2d8f2c",
            "&:hover": {
              backgroundColor: "#256b23",
            },
          }}
        >
          Agregar Producto
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
        item="Producto"
        itemName={deleteModal.itemName}
      />
    </>
  );
};
Products.propTypes = {};

export default Products;
