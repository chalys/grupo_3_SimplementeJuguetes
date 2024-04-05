const fs = require('fs');
const path = require('path');
module.exports = (req, res) =>{
    const searchJSON = path.join(__dirname,"../../data/productsDataBase.json")
    let products = JSON.parse(fs.readFileSync(searchJSON, 'utf-8'))
    const id = req.params.id;
    const searchProduct = products.find((p)=>{
    return p.id == id
    });
    res.render("detail",{
        p: searchProduct,
        ps: products,
    })
}
