const { loadData } = require("../../dataBase");

module.exports = (req, res) => {
  const { id } = req.params;
  const products = loadData("products");
  const productFind = products.find((p) => p.id === +id);
  res.render("./admin/editProduct", { product:productFind });
};
