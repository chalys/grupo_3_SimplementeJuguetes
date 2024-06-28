import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (type, message) => {
  const options = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  // Utilizamos un objeto para definir el estilo de la notificación
  const toastOptions = {
    ...options,
    style: { backgroundColor: type === 'success' ? 'green' : 'red', color: 'white' }
  };

  // Mostramos la notificación según el tipo
  if (type === 'success') {
    toast.success(message, toastOptions);
  } else if (type === 'error') {
    toast.error(message, toastOptions);
  }
  
};