const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { loadData } = require("../../dataBase");

module.exports = (req, res) =>{
    const products = loadData("products");
    res.render("other/home",{products:products, toThousand})
}