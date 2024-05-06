// const fs = require('fs');
// const path = require('path');
// module.exports = (req, res) =>{
//     const searchJSON = path.join(__dirname,"../../dataBase/products.json")
//     let products = JSON.parse(fs.readFileSync(searchJSON, 'utf-8'))
//     const id = req.params.id;
//     const searchProduct = products.find((p)=>{
//     return p.id == id
//     });
//     res.render("detail",{
//         p: searchProduct,
//         ps: products,
//     })
// }

// const db = require("../../dataBase/models");
// module.exports = (req,res)=>{
//     const {id}=req.params;
//     db.product.findByPk(id,{include:["secondaryImage"]}).then((p)=>{
//         db.product.findByPk(id).then((p)=>{
//         res.render("products/detail",{p})
//     })
// }


const db = require("../../dataBase/models");

module.exports = (req, res) => {
    const { id } = req.params;

    // Consulta para obtener el listado completo de productos
    const findAllProducts = db.product.findAll({ include: ["secondaryImage"] });

    // Consulta para obtener el producto específico por su id
    const findProductById = db.product.findByPk(id, { include: ["secondaryImage"] });

    // Ejecutar ambas consultas simultáneamente
    Promise.all([findAllProducts, findProductById])
        .then(([allProducts, specificProduct]) => {
            // Renderizar la vista con ambos resultados
            res.render("products/detail", { allProducts, specificProduct });
        })
        .catch(error => {
            // Manejar cualquier error que pueda ocurrir
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        });
}