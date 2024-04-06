module.exports = (req, res) =>{
    const products=require("../../dataBase/products.json")

    res.render("listProduct",{
        products
    })
}