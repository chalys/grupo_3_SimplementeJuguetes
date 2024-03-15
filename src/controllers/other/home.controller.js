const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { loadData } = require("../../data");

module.exports = (req, res) =>{
    const products = loadData();
    res.render("other/home",{products:products, toThousand})
}