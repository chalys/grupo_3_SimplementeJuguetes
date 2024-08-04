const db = require("../../dataBase/models");

const loginAndRegisterFacebook = async (req, res) => {
  try {
    const { user: { _json, provider } } = req.session.passport;
    const { id, first_name, last_name, email } = _json;

    const [user, created] = await db.user.findOrCreate({
      where: {
        socialId: id,
      },
      defaults: {
        socialId: id,
        provider,
        userName: first_name,
        name: last_name,
        email,
        userPicture: `https://graph.facebook.com/${id}/picture?type=large`,
      },
    });

    req.session.userLogin = {
      id: user.id,
      userName: user.userName,
      name: user.name,
      userPicture: user.userPicture,
      roleId:2
      //roleId: "REGULAR",
    };

    res.cookie("userLogin", req.session.userLogin, { maxAge: 6000 * 30 });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = loginAndRegisterFacebook;