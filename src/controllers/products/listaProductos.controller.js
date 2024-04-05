
const fs = require('fs');
const path = require('path');
module.exports = (req, res) =>{
    const searchJSON = path.join(__dirname,"../../data/productsDataBase.json")
    let products = JSON.parse(fs.readFileSync(searchJSON, 'utf-8'))
    res.render("./products/listProduct",{
      products: products,
    })
}
