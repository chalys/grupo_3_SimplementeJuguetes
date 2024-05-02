/*const { loadData } = require("../../dataBase");

module.exports = (req, res) => {
  const { id } = req.params;
  const users = loadData("usuarios");
  const loadProvince = loadData("province");
  const userFind = users.find((u) => u.id === +id);
  res.render("./authentication/editUser", {
    user: userFind,
    province: loadProvince,
  });
};*/
const {baseDatos}= require("../../dataBase/models")
 module.exports =(req,res)=>{

const {id} =req.params;

const userP = baseDatos.province.findAll();
const user = baseDatos.user.findByPk(id)



Promise.all([userP,user])
.then((userP,user) => {
  res.render("./authentication/editUser", {
    user: userFind,
    province: loadProvince,
  });
})

 }
