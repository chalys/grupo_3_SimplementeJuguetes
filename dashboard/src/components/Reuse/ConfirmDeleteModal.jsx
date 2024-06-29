import React from "react";
import PropTypes from "prop-types";
import { Modal, Box, Typography, Button } from "@mui/material";

const ConfirmDeleteModal = ({ open, onClose, onConfirm, item, itemName }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Eliminar {item}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          ¿Está seguro de que desea eliminar {item} - {itemName}?
        </Typography>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>
            Cancelar
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Eliminar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

ConfirmDeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
};

export default ConfirmDeleteModal;
