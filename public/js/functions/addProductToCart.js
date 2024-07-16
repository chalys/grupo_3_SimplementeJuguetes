/*
const createAlert = ({type, title, timer}) => {
    Swal.fire({
      position: "top-end",
      icon: type,
      title,
      showConfirmButton: false,
      timer
    });
  }*/


const addProductCart = async (id) => {
  const server = "http://localhost:3030";
  try {
    const { ok, msg } = await fetch(`${server}/api/cart/add/${id}?userId=2`, {
      method: "PATCH",
    }).then((res) => res.json());
    ok && toastr["success"]("Producto agregado al carrito con éxito");
  } catch (error) {
    console.error(error.message);
  }
};

