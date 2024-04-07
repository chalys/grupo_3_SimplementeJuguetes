const fs = require("fs")
const path = require("path");
const { loadData, saveData } = require("../../dataBase");

module.exports = (req, res) => {
    const {id} = req.params;
    const products = loadData('products');

    const productsLessOne = products.filter(p => p.id !== +id);
    const productToDelete = products.find(p => p.id === +id)
    const imagePath = path.join(__dirname, `../../../public/images/products/${productToDelete.firstImg}`) 

        if (fs.existsSync(imagePath)){
            fs.unlinkSync(imagePath)
        }

    saveData(productsLessOne,"products")
    res.redirect("/admin/lista-productos")
    
}