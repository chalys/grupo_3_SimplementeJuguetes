// module.exports = (req, res) =>{
//     const products=require("../../dataBase/products.json")
//     res.render("listProduct",{
//         products
//     })
// }

const db = require("../../dataBase/models")
module.exports = (req, res) => {
  db.product.findAll().then((products) => {
    res.render("admin/listProduct", { products });
  });
};