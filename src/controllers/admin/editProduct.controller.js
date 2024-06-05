const { validationResult } = require("express-validator");

const db = require("../../dataBase/models");

module.exports = (req, res) => {
  const errors = validationResult(req);
  const { id } = req.params;

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

    db.secondaryimage
      .findAll({
        productId: id,
      })
      .then((images) => {
        let newImages = [];

        if (req.files.secondImg?.length) {
          newImages = req.files.secondImg?.map((img) => {
            return {
              file: img.filename,
              productId: +id,
            };
          });
        }
        // if (rememberImagesSecondary === "on") {
        //   const imagesFormat = images.map((img) => {
        //     return {
        //       file: img.file,
        //       productId: img.productId,
        //     };
        //   });
        //   newImages = [...newImages, ...imagesFormat];
        // }
        db.product
          .update(
            {
              name: name?.trim(),
              manufacturer: manufacturer
                ? manufacturer.trim()
                : "Sin especificar", //
              mark: mark ? mark.trim() : "Sin clasificar", //
              sku: +sku || 0,
              available: available === "yes" ? 1 : 0,
              collection: collection ? collection.trim() : "Sin clasificar", //
              stock: +stock,
              price: +price || 0,
              line: line ? line.trim() : "sin linea", //
              categoryId: categoryId ? +categoryId : 8,
              character: character ? character.trim() : "Sin clasificar", //
              characterVersion: characterVersion
                ? characterVersion.trim()
                : "Sin clasificar", //
              minAge: minAge ? minAge.trim() : "Edad Libre", //
              height: +height || 0,
              depth: +depth || 0,
              width: +width || 0,
              materials: materials ? materials.trim() : "Sin clasificar", //
              scale: scale ? scale.trim() : "Sin escala", //
              articulated: articulated === "yes" ? 1 : 0,
              collectable: collectable === "yes" ? 1 : 0,
              accessories: accessories === "yes" ? 1 : 0,
              bobbleHead: bobbleHead === "yes" ? 1 : 0,
              description: description
                ? description.trim()
                : "Este juguete no cuenta con una descripcion", //
              firstImg:
                req.files.firstImg?.length && req.files.firstImg[0].filename,
            },
            {
              where: {
                id,
              },
            }
          )
          .then(() => {
            //   res.redirect("/admin/lista-productos");
            // })
            // .catch((err) => res.send(err.message));

            // .then(() => {
            //   primero resuelvo la actualización del producto

            db.secondaryimage
              .destroy({
                // borramos las imágenes viejas!
                where: {
                  productId: +id,
                },
              })
              .then(() => {
                db.secondaryimage.bulkCreate(newImages).then(() => {
                  // creamos las nuevas
                  res.redirect("/admin/lista-productos");
                });
              });
          })
          .catch((err) => res.send(err.message));
      });

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

    // res.redirect("/admin/lista-productos");
  } else {
    //const product = products.find((p) => p.id === +id);
    const errorsMapped = errors.mapped();
    const productPromise = db.product.findByPk(id);
    const categoryPromise = db.category.findAll();

    Promise.all([productPromise, categoryPromise]).then(
      ([product, category]) => {
        res.render("admin/editProduct", {
          product,
          category,
          errors: errorsMapped,
          old: req.body,
        });
      }
    );
  }
};
