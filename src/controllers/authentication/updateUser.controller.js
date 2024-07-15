/*const db = require("../../dataBase/models");
module.exports = (req, res) => {
  const { id } = req.params;
  const provincePromise = db.province.findAll();
  const userPromise = db.user.findByPk(id);

  console.log(userPromise);

  Promise.all([userPromise, provincePromise]).then(([province, user]) => {
    res.render("authentication/editUser", { user, province });
  });
};*/

const db = require("../../dataBase/models");
module.exports = (req, res) => {
  const { id } = req.params;
  const userPromise = db.user.findByPk(id);

  

  Promise.all([userPromise]).then(([ user]) => {
    res.render("authentication/editUser", { user});
  });
};
