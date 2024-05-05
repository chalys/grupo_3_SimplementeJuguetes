const { validationResult } = require("express-validator");
const { saveData, loadData } = require("../../dataBase");

module.exports= (req,res) => {
const errors = validationResult(req);
const { id }= req.params
const products = loadData("products");
/*const products =require("../../dataBase/products.json")*/
if (errors.isEmpty()) {
    const {name,price,description,line,
    characterVersion,stock,maker,
    character,articulated,
    collectable,includesAccessories
    } = req.body

    const productsMap = products.map((p) => {
      if (p.id === +id) {
        const productEdit = {
          ...p,
        name: name.trim(),
        price:+price,
        description:description.trim(),
        line:line.trim(),
        characterVersion:characterVersion.trim(),
        stock:+stock,
        maker:maker.trim(),
        character:character.trim(),
        /*articulated:,
         collectable:,
        includesAccessories:*/
        };
        return productEdit;
      }
      return p;
    });

    saveData(productsMap,"products");
    res.redirect("/admin/lista-productos");
  }

}
