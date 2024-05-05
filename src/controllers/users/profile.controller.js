// const { loadData } = require("../../dataBase");
const db = require('../../dataBase/models')
module.exports = (req, res) => {
  const { id } = req.params;
  // const users = loadData("usuarios");
  // const loadProvince = loadData("province");
  // const userFind = users.find((u) => u.id === +id);
db.user.findByPk(id)
.then((u)=>{
  res.render("profile", {
    user: u,
    province: u.province,
    userId: id,
  });

})
};
