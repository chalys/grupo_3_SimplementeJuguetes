import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { showToast } from "../../utils/toastr";
import "react-toastify/dist/ReactToastify.css";


const CategoryModal = ({ open, onClose, isEdit, categoryData, onSave }) => {
  const urlApiCategories = `http://localhost:3030/api/category`;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit && categoryData) {
      setName(categoryData.name);
      setDescription(categoryData.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [isEdit, categoryData]);

  const handleSave = async () => {
    try {
      if (isEdit) {
        const endpoint = await axios.put(
          `${urlApiCategories}/${categoryData.id}`,
          {
            name: name,
            description: description,
          }
        );
        const updatedCategory = endpoint.data;
        onSave(updatedCategory);
      } else {
        const endpoint = await axios.post(urlApiCategories, {
          name: name,
          description: description,
        });
        const newCategory = endpoint.data;
        onSave(newCategory);
      }
      onClose();
    } catch (error) {
      setError(
        `Error al ${
          isEdit ? "editar" : "guardar"
        } la categoría. Por favor, inténtalo de nuevo`
      );
      console.error(
        `Error al ${isEdit ? "editar" : "guardar"} la categoría:`,
        error
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {isEdit ? "Editar Categoría" : "Agregar Categoría"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nombre"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Descripción"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{
            mb: 2,
            backgroundColor: "#2d8f2c",
            "&:hover": {
              backgroundColor: "#256b23",
            },
            textTransform: "none",
          }}
        >
          {isEdit ? "Guardar Cambios" : "Guardar"}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          sx={{
            mb: 2,
            backgroundColor: "#e2001a",
            "&:hover": {
              backgroundColor: "#cc0015",
            },
            textTransform: "none",
          }}
        >
          Cancelar
        </Button>
      </DialogActions>
      {error && (
        <DialogContent>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default CategoryModal;
