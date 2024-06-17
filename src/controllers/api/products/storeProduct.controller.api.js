const db = require("../../../dataBase/models");
module.exports = (req, res) => {
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
  let newImages = [];
   if (req.files.secondImg?.length) {
     newImages = req.files.secondImg?.map((img) => {
       return {
         file: img.filename,
       };
     });
   }
  db.product.create({
    name: name.trim(),
    manufacturer: manufacturer.trim(),
    mark: mark.trim(),
    sku: +sku || 0,
    available: available === "yes" ? 1 : 0,//revisar
    collection: collection.trim(),
    stock:+stock || 0,
    categoryId:+categoryId,//revisar
    price: +price || 0,
    line:line.trim(),
    character:character.trim(),
    characterVersion: characterVersion.trim(),
    minAge:minAge.trim(),
    height:+height || 0,
    depth:+depth || 0,
    width:+width || 0,
    materials:materials.trim(),
    scale:scale.trim(),
    articulated: articulated === "yes" ? 1 : 0,
    collectable: collectable === "yes" ? 1 : 0,
    accessories: accessories === "yes" ? 1 : 0,
    bobbleHead: bobbleHead === "yes" ? 1 : 0,
    description:description.trim(),
    firstImg: req.files.firstImg?.length
       ? req.files.firstImg[0]?.filename
       : "default-image.jpg",
    secondaryImage: newImages
  },{
    include:["secondaryImage"],
  }
)
  .then(() => {
    res.status(201).json({
      ok: true,
      msg: "Producto creado con éxito",
    });
    
  })
  .catch((err) => {
    res.status(500).json({
      ok: false,
      msg: err.message,
    });
  });
};
