const db = require("../../../dataBase/models");
const getOriginUrl = require("../../utils/getOriginUrl");

module.exports = async (req, res) => {
  try {
    const id = +req.params.id;
    const userFind = await db.user.findByPk(id, {
      attributes: [
        "userName",
        "name",
        "email",
        "province",
        "locality",
        "postal",
        "street",
        "streetNumber",
        "floor",
        "betweenSt1",
        "betweenSt2",
        "phoneNumber",
        "indications",
      ],
    });

    if (!userFind) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const avatarURL = `${getOriginUrl(req)}/images/users/${userFind.userPicture}`;

    return res.status(200).json({
      user: userFind,
      avatar: avatarURL,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message,
    });
  }
};
