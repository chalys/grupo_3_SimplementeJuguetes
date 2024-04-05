const { loadData, saveData } = require("../../data");

module.exports = (req, res) => {
  const {name,description,manufacturer,mark, sku, available, colection,price, line, character,characterVersion,minAge,height, depth,width, materials, scale,articulated,collectable,accessories,bobbleHead} = req.body;

  let newImages = [];
  if(req.files.secondImg?.length) {
    newImages = req.files.secondImg?.map(img => img.filename)
  }

  const products = loadData("productsDataBase");
  const newID = products[products.length - 1].id + 1;
  const newProduct = {
    id: newID,
    name: name.trim(),
    description: description.trim(),
    manufacturer:manufacturer.trim(),
    mark:mark.trim(),
    sku:+sku,
    available:available?.trim(),
    colection: colection.trim(),
    price: +price,
    line: line.trim(),
    character: character.trim(),
    characterVersion: characterVersion.trim(), 
    minAge: minAge?.trim(),
    height:+height,
    depth:+depth,
    width:+width,
    materials:materials?.trim(),
    scale: +scale,
    articulated: articulated?.trim(),
    collectable: collectable?.trim(),
    accessories: accessories?.trim(),
    bobbleHead:bobbleHead?.trim(),
    firstImg: req.files.firstImg?.length ? req.files.firstImg[0]?.filename : "default-image.png",
    secondImg: newImages.length ? newImages : ["default-image.png"],      
  };

  products.push(newProduct);
  saveData(products);
  /*res.redirect(`/productos/detalle/${newID}`);*/
  res.redirect(`/productos/detalle`);
};