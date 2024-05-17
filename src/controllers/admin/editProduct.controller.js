const { validationResult } = require("express-validator");
const { saveData, loadData } = require("../../dataBase");
const db = require("../../dataBase/models");

module.exports= (req,res) => {
const errors = validationResult(req);
const { id }= req.params
const products = loadData("products");
if (errors.isEmpty()) {
  const {
    name,
    manufacturer,
    mark,
    sku,
    available,
    collection,
    stock,
    categoryId,
    price,
    line,
    character,
    characterVersion,
    minAge,
    height,
    depth,
    width,
    materials,
    scale,
    articulated,
    collectable,
    accessories,
    bobbleHead,
    description,
  } = req.body;
     

    db.Product.update(
      {
        name: name?.trim(),
        manufacturer: manufacturer? manufacturer.trim(): "Sin especificar", //
        mark: mark ? mark.trim() : "Sin clasificar", //
        sku: +sku || 0,
        available: available === "yes" ? 1 : 0,
        collection: collection ? collection.trim() : "Sin clasificar", //
        stock: +stock,
        price: +price || 0,
        line: line? line.trim(): 'sin linea', //
        categoryId: categoryId? +categoryId : 0,
        character: character ? character.trim() : "Sin clasificar", //
        characterVersion: characterVersion ? characterVersion.trim() : "Sin clasificar", //
        minAge: minAge ? minAge.trim() : "Edad Libre", //
        height: +height || 0,
        depth: +depth || 0,
        width: +width || 0,
        materials: materials ? materials.trim() : "Sin clasificar", //
        scale: scale?scale.trim():"Sin escala", //
        articulated: articulated === "yes" ? 1 : 0,
        collectable: collectable === "yes" ? 1 : 0,
        accessories: accessories === "yes" ? 1 : 0,
        bobbleHead: bobbleHead === "yes" ? 1 : 0,
        description: description ? description.trim() : "Este juguete no cuenta con una descripcion",//
        firstImg: req.files.firstImg?.length
          ? req.files.firstImg[0]?.filename
          : "default-image.jpg",

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

    saveData(productsMap,"products");*/

    res.redirect("/admin/lista-productos");

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
