const path = require("path");
// 1° traer todos los productos existentes en mi base de datos.
const fs = require("fs");
// const { loadData } = require("../../database");
const { validationResult, body } = require("express-validator");

const db = require("../../dataBase/models");

module.exports = (req, res) => {
  // return res.send(req.body)
  const errors = validationResult(req);
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

    db.product
      .create({
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
        //secondImg: newImages?.length? newImages : ["default-image.jpg"],
      })
     
      .then((product) => {
        let newImages = [];
        if (req.files.secondImg?.length) {
          newImages = req.files.secondImg?.map((img) => {
            return {
              file: img.filename,
              productId: product.id,
            };
          });
        }

        db.secondaryimage.bulkCreate(newImages).then(() => {
          return res.redirect("/admin/lista-productos?success=true");
        });
      });
  } else {
    const old = req.body
    const errorsMapped = errors.mapped();
    db.category.findAll()
    .then(category => {

      res.render(
        "admin/addProduct",
        { category, errors: errorsMapped, old: req.body }
        
      );

    })


    // res.render("./admin/addProduct",{
    //   errors: errorsMapped,
    //   old: old,
  
    // const productPromise = db.product.findByPk(id);
    // Promise.all([productPromise]).then(([product]) => {
    //   res.render(
    //     "admin/updateProduct",
    //     { product, errors: errorsMapped, old: req.body },
    //     (err) => {
    //       err && res.send(err.message);          
    //     }
    //   );
    // });
  }
};

/* anterior codigo 
const { loadData, saveData } = require("../../dataBase");

module.exports = (req, res) => {
  const {
    name,
    description,
    manufacturer,
    mark,
    sku,
    available,
    collection,
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
  } = req.body;

  let newImages = [];
  if (req.files.secondImg?.length) {
    newImages = req.files.secondImg?.map((img) => img.filename);
  }

  const products = loadData("products");
  const newID = products[products.length - 1].id + 1;
  const newProduct = {
    id: newID,
    name: name.trim(),
    description: description.trim(),
    manufacturer: manufacturer.trim(),
    mark: mark.trim(),
    sku: +sku,
    available: available?.trim(),
    collection: collection.trim(),
    price: +price,
    line: line.trim(),
    character: character.trim(),
    characterVersion: characterVersion.trim(),
    minAge: minAge?.trim(),
    height: +height,
    depth: +depth,
    width: +width,
    materials: materials?.trim(),
    scale: +scale,
    articulated: articulated?.trim(),
    collectable: collectable?.trim(),
    accessories: accessories?.trim(),
    bobbleHead: bobbleHead?.trim(),
    firstImg: req.files.firstImg?.length
      ? req.files.firstImg[0]?.filename
      : "default-image.jpg",
    secondImg: newImages.length ? newImages : ["default-image.jpg"],
  };

  products.push(newProduct);
  saveData(products, "products");
  res.redirect(`/productos/detalle-producto/${newID}`);
};
*/
