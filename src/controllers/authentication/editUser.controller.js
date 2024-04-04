const { loadData } = require("../../data");

module.exports = (req, res) => {
  const { id } = req.params;
  const users = loadData("users");
  const loadProvince = loadData("province");
  const userFind = users.find((u) => u.id === +id);
  res.render("./autentication/editUser", {
    user: userFind,
    province: loadProvince,
  });
};