const { loadData } = require("../../dataBase");

module.exports = (req, res) => {
  const products = loadData("products"); 
  const { id } = req.params; 

  
  const productFind = products.find((p) => p.id === +id);
  res.render("./admin/editProduct", { product:productFind });
};
/*
  const product = products.find((p) => p.id === +id);

  res.render("admin/updateProduct", { product }, (err, contentView) => {
    err && res.send(err.message);
    res.render("partials/dashboard", { contentView });
  });
};*/
