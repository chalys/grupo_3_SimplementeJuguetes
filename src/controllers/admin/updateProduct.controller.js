const { loadData, saveData } = require("../../data");

module.exports = (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    description,
    line,
    characterVersion,
    stock,
    maker,
    character,
    articulated,
    collectable,
    includesAccessories,
  } = req.body;

  const products = loadData();
  const productsMapped = products.map((p) => {
    if (p.id === +id) {
      productUpdate = {
        ...p,
        name: name.trim(),
        price: +price,
        description: description.trim(),
        line: line.trim(),
        characterVersion: characterVersion.trim(),
        stock: +stock,
        maker: maker.trim(),
        character: character.trim(),
        /*articulated:,
                collectable:,
                includesAccessories:*/
      };
      return productUpdate;
    }
    return p;
  });
  saveData(productsMapped);
  res.redirect(`productos/detalle/${id}`);
};
