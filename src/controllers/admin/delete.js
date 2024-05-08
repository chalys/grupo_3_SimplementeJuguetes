
const { db} = require("../../dataBase/models");


module.exports = (req, res) => {
    const {id} = req.params
db.secondaryImage.destroy({
    where:{
        productId:id
    }
})
.then(()=>{
db.products.destroy({
    where: {
        id
    }
})
.then(()=>{
    res.redirect("/admin/lista-productos")
})
})

}