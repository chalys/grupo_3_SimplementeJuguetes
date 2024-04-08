const { loadData } = require("../../dataBase");

module.exports = (req, res) => {
  const { id } = req.params;
  const users = loadData("usuarios");
  const loadProvince = loadData("province");
  const userFind = users.find((u) => u.id === +id);
  res.render("profile", {
    user: userFind,
    province: loadProvince,
    userId: id,
  });
};
