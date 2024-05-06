// const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// const { loadData } = require("../../dataBase");

// module.exports = (req, res) =>{
//     const products = loadData("products");
//     res.render("other/home",{products:products, toThousand})
// }

const db = require("../../dataBase/models");

module.exports = (req, res) => {
  db.product.findAll().then((products) => {
    res.render("./other/home", {
      products,
    });
  });
};
