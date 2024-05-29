const db = require("../../dataBase/models")
module.exports = (req, res) =>{
    db.category.findAll().then((category)=>{
        res.render("./admin/addProduct",{category})
    })
}