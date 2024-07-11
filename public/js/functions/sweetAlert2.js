  // Función para crear alertas con SweetAlert2
  const createAlert = ({type, title, timer}) => {
    Swal.fire({
      position: "top-end",
      icon: type,
      title,
      showConfirmButton: false,
      timer
    });
  }