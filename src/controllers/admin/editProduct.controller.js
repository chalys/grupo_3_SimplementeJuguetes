const { validationResult } = require("express-validator");
//const { saveData, loadData } = require("../../dataBase");
const db = require("../../dataBase/models");

module.exports= (req,res) => {
const errors = validationResult(req);
const { id }= req.params
//const products = loadData("products");

if (errors.isEmpty()) {
    const {name,price,description,line,
    characterVersion,available,manufacturer,
    character, section, recSecondaryImage
    } = req.body;
     
    /*//A implementar ya que no contamos con este campo.
 
    db.secondaryimage.findAll({
      productId: id
    })
    .then(images => {
      let newImages = [];
      if(req.files.secondaryimage?.length){
        newImages = req.files.secondaryimage?.map((img) => img.filename);
        return{
          file: img.filename,
          productId: +id
        }    
      }

      if(recSecondaryImage === "on")
        newImages = [
          ...newImages,
          ...images,
      ]
    })
*/
    db.product.update(
      {
      name: name.trim(),
      price: +price,
      description: description.trim(),
      line: line.trim(),
      characterVersion: characterVersion.trim(),
      available: available,
      manufacturer: manufacturer.trim(),
      character: character.trim(),
      /*imagenPrincipal: req.files.imagenPrincipal[0]?.filename*/
      articulated: section === "articulated",
      collectable: section === "collectable",
      includesAccessories: section === "includesAccessories"
    },{
      where: {
        id
      }
    })
    .then((isUpdate) => {

      res.redirect("/admin/lista-productos");

    }).catch(err => res.send(err.message));


  //VERSION ANTERIOR
/*
    const productsMap = products.map((p) => {
      if (p.id === +id) {
        const productEdit = {
          ...p,
        name: name.trim(),
        price:+price,
        description:description.trim(),
        line:line.trim(),
        characterVersion:characterVersion.trim(),
        stock:+stock,
        maker:maker.trim(),
        character:character.trim(),
          /*
        imagenPrincipal: req.file.imagenPrincipal?.length
        ? req.files.imagenPrincipal[0]?.filename
        : p.imagenPrincipal,*-/   
        articulated: section === "articulated",
        collectable: section === "collectable",
        includesAccessories: section === "includesAccessories"
        };
        return productEdit;
      }
      return p;
    });

    saveData(productsMap,"products");

    // res.redirect("/admin/lista-productos");
*/
  } else {
    //const product = products.find((p) => p.id === +id);
    const errorsMapped = errors.mapped();
    const productPromise = db.product.findByPk(id)
    
    Promise.all([productPromise])
    .then(([product]) =>{

      res.render(
            "admin/updateProduct",
            { product, errors: errorsMapped, old: req.body },
            (err, contentView) => {
              err && res.send(err.message);
              res.render("partials/dashboard", { contentView });
            }
          );

    })
    
    
  }

}
