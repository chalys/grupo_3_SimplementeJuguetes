const { loadData } = require("../../dataBase");

module.exports = (req, res) => {
  const products = loadData("products"); 
  const { id } = req.params; 

  
  const productFind = products.find((p) => p.id === +id);
  res.render("./admin/editProduct", { product:productFind });
};

/*  Se intento implementar pero por un error se deja la anterior version
const db = require('../../dataBase/models')
module.exports = (req,res) => {

    const { id } = req.params;
    const productPromise = db.product.findByPk(id)

    Promise.all([productPromise])
    .then(([product]) => {

      res.render("/admin/updateProduct", {
        product
      }, (err,content) => {
        if (err) {
          console.error(err.message);
          return res.send(err.message);
        }
        res.render('partials/dashboard', {
          contentView:content
        })
}      )
    })
    
}

//------------------------------------------------------
*/


/*
  const product = products.find((p) => p.id === +id);

  res.render("admin/updateProduct", { product }, (err, contentView) => {
    err && res.send(err.message);
    res.render("partials/dashboard", { contentView });
  });
};*/
