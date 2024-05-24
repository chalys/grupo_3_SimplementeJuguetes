const db = require("../../../dataBase/models");
const getOriginUrl = require("../../utils/getOriginUrl");
module.exports = async (req, res) => {
  try {
    const id = +req.params.id;
    const productFind = await db.product.findByPk(id, {
      include: ["Category"],
      attributes: {
        exclude: ["createdAt", "updatedAt","deletedAt"],
      },
    });

    if (!productFind) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const imageURL = `${getOriginUrl(req)}/images/products/${productFind.firstImg}`;

    return res.status(200).json({
      product:productFind,
      image: imageURL,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message,
    });
  }
};
