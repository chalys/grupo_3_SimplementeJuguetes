const db = require("../../../dataBase/models");
module.exports = (req, res) => {
    const {
        name,
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
      db.product
      .create({
        name: name.trim(),
        manufacturer: manufacturer ? manufacturer.trim() : "",
        mark: mark ? mark.trim() : "",
        sku: +sku || 0,
        available: available === "yes" ? 1 : 0,
        collection: collection ? collection.trim() : "",
        price: +price || 0,
        line: line ? line.trim() : "",
        character: character ? character.trim() : "",
        characterVersion: characterVersion ? characterVersion.trim() : "",
        minAge: minAge ? minAge.trim() : "",
        height: +height || 0,
        depth: +depth || 0,
        width: +width || 0,
        materials: materials ? materials.trim() : "",
        scale: scale?scale.trim():"",
        articulated: articulated === "yes" ? 1 : 0,
        collectable: collectable === "yes" ? 1 : 0,
        accessories: accessories === "yes" ? 1 : 0,
        bobbleHead: bobbleHead === "yes" ? 1 : 0,
        description: description ? description.trim() : "",
        firstImg: req.files.firstImg?.length
          ? req.files.firstImg[0]?.filename
          : "default-image.jpg",
        secondImg: newImages,
      })
}