module.exports = (req, res) => {
  const products = require("../../basesDeDatos/productos.json");
  const { id } = req.params;
  const product = products.find((p) => p.id === +id);

  res.render("editProduct", { product });
};
