import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ConfirmDeleteModal from "../components/Reuse/ConfirmDeleteModal";
import axios from "axios";
import "../assets/css/style.css";

const Users = () => {
  const urlUsers = `http://localhost:3030/autenticacion/`;
  const urlApiUsers = `http://localhost:3030/api/users/`;
  const [statesUsers, setStatesUsers] = useState({
    loading: true,
    users: [],
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
    const url = `${urlUsers}registro/`;
    window.open(url, "_blank");
  };

  const handleDetailClick = (params) => {
    const url = `${urlUsers}detalle-usuario/` + params.id;
    window.open(url, "_blank");
  };

  const handleEditClick = (params) => {
    const url = `${urlUsers}editar-usuario/` + params.id;
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
      .delete(`${urlApiUsers}${itemId}`)
      .then((response) => {
        if (response.data.ok) {
          setStatesUsers((prevState) => ({
            ...prevState,
            users: prevState.users.filter((u) => u.id !== itemId),
          }));
          handleCloseDeleteModal();
          console.log("Usuario eliminado con éxito.");
        } else {
          console.error("Error al eliminar usuario:", response.data.msg);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar usuario:", error);
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

    const columnsFormat = [
      { field: "id", headerName: "Id", width: 60 },
      {
        field: "userPicture",
        headerName: "Imagen",
        width: 80,
        renderCell: (params) => (
          <img
            src={`${urlApiUsers}/${params.value}`}
            alt="Avatar"
            style={{
              width: "70%",
              height: "auto",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ),
      },
      { field: "userName", headerName: "Usuario", width: 200 },
      { field: "email", headerName: "Correo Electrónico", width: 300 },
      { field: "name", headerName: "Nombre Completo", flex: 1 },
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

    statesUsers.users.forEach((user) => {
      const objData = {};
      Object.entries(user).forEach(([key, value]) => {
        objData[key] = value;
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
      <Container sx={{ height: 700, width: "100%" }}>
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "center", mb: 3, color: "#e2001a" }}
        >
          TODOS LOS USUARIOS
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
          Agregar Usuario
        </Button>
        <DataGrid
          rows={dataGrid.rows}
          columns={dataGrid.columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
          componentsProps={{
            pagination: {
              nextButton: {
                style: {
                  color: "green",
                },
              },
              backButton: {
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
        item="Usuario"
        itemName={deleteModal.itemName}
      />
    </>
  );
};

Users.propTypes = {};

export default Users;
