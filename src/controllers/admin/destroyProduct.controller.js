//  const fs = require("fs")
//  const path = require("path");
//  const { loadData, saveData } = require("../../dataBase");

//  module.exports = (req, res) => {
//     const {id} = req.params;
//      const products = loadData('products');

//     const productsLessOne = products.filter(p => p.id !== +id);
//     const productToDelete = products.find(p => p.id === +id)
//     const imagePath = path.join(__dirname, `../../../public/images/products/${productToDelete.firstImg}`)

//         if (fs.existsSync(imagePath)){
//              fs.unlinkSync(imagePath)
//         }

//     saveData(productsLessOne,"products")
//     res.redirect("/admin/lista-productos")

// }

const { db } = require("../../dataBase/models");

module.exports = (req, res) => {
  const { id } = req.params;
  db.secondaryimage.destroy({
      where: {
        productId: id,
      },
    })
    .then(() => {
      db.Product
        .destroy({
          where: {
            id,
          },
        })
        .then(() => {
          res.redirect("/admin/lista-productos");
        });
    });
};