module.exports = (req, res) =>{
    const products = require("../../data/productsDataBase.json")
    const { id }=req.params;
  const product =  products.find((p)=>p.id=== +id);
    
    res.render("editProduct",{product});
}