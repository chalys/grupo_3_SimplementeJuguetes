module.exports = (req, res) =>{
    const products=require("../../basesDeDatos/productos.json")

    res.render("listProduct",{
        products
    })
}