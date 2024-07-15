// const { loadData } = require("../../dataBase"); old

// const db = require("../../dataBase/models");
// module.exports = (req, res) => {
//   const { id } = req.params;
  // const users = loadData("usuarios"); old 
  // const loadProvince = loadData("province"); old
  // const userFind = users.find((u) => u.id === +id); old
//   db.user.findByPk(id).then((u) => {
//     res.render("profile", {
//       user: u,
//       province: u.province,
//       userId: id,
//     });
//   });
// };

const db = require("../../dataBase/models");
//const fetch = require("node-fetch");

module.exports = (req, res) => {
  if (req.session?.userLogin) {
        db.user.findOne({
          where: {
            id: req.session?.userLogin?.id,
          },
          //include: ["addresses"],
        }).then((user) => {
          res.render("users/profile", { user });
        });
  }
};