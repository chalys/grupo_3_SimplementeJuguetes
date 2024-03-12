const { loadData, saveData } = require("../../data");

module.exports = (req, res) => {
  const {name,description,stock,price,maker,line,collection,character,characterVersion,recommendedMinimumAge,initialScale,articulated,collectable,includesAccessories} = req.body;
  //const imagePrimary = req.file;

  let newImages = [];
  if(req.files.imagesSecondary?.length) {
    newImages = req.files.imagesSecondary?.map(img => img.filename)
  }

  const products = loadData();
  const newID = products[products.length - 1].id + 1;
  const newProduct = {
    id: newID,
    name: name.trim(),
    description: description.trim(),
    //imagePrimary: imagePrimary ? imagePrimary.filename : "default-image.png",
    imagePrimary: req.files.imagePrimary?.length ? req.files.imagePrimary[0]?.filename : "default-image.png",
    imagesSecondary: newImages.length ? newImages : ["default-image.png"],
    stock: +stock,
    price: +price,
    maker: maker.trim(),
    line: line.trim(),
    collection: collection.trim(),
    character: character.trim(),
    characterVersion: characterVersion.trim(), 
    recommendedMinimumAge: +recommendedMinimumAge,
    initialScale: +initialScale,
    articulated: articulated?.trim(),
    collectable: collectable?.trim(),
    includesAccessories: includesAccessories?.trim() 
  };

  products.push(newProduct);
  saveData(products);
  /*res.redirect(`/productos/detalle/${newID}`);*/
  res.redirect(`/productos/lista-productos`);
};