const db = require("../../../dataBase/models");
const getOriginUrl = require("../../utils/getOriginUrl");
const { ErrorCustom } = require("../../utils/createError");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const productFind = await db.product.findByPk(id, {
      include: ["Category"],
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });
    if (!productFind) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    const imageURL = `${getOriginUrl(req)}/api/products/${
      productFind.firstImg
    }`;
    return res.status(200).json({
      product: productFind,
      image: imageURL,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      ok: false,
      msg: err.message,
    });
  }
};
