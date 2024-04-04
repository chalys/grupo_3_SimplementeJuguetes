const { loadData } = require("../../dataBase");

module.exports = (req, res) => {
  const { id } = req.params;
  //const products = require("../../basesDeDatos/productos.json")
  const users = require("../../data/.json")

  const loadProvince = loadData("province");
  const userFind = users.find((u) => u.id === +id);
  res.render("./authentication/editUser", {
    user: userFind,
    province: loadProvince,
  });
};