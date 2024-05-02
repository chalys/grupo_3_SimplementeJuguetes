
const { dataBase} = require("../../dataBase/models");


module.exports = (req, res) => {
    const {id} = req.params
dataBase.secondImg.destroy({
    where:{
        productId:id
    }
})
.then(()=>{
dataBase.product.destroy({
    where: {
        id
    }
})
.then(()=>{
    res.redirect("/admin/lista-productos")
})
})

}