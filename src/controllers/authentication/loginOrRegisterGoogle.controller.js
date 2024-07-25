const db = require("../../dataBase/models");

module.exports = async (req, res) => {
  try {
    const {user: { _json, provider }} = req.session.passport;
    //console.log(req.session.passport);
    const { sub, given_name, family_name, picture, email } = _json;
 
    const [user, _] = await db.user.findOrCreate({
      where:{
        socialId: sub
      },
      defaults: {
        socialId: sub,
        provider,
        //name: given_name,
        //surname: family_name,
        userName: given_name,
        name: family_name,
        email, 
        userPicture: picture,   
      },
    })

    req.session.userLogin = {
      id: user.id,
      userName: user.userName,
      name: user.name,
      userPicture: user.userPicture,
      role: "REGULAR" // user.role.name,      
    }
    
    res.cookie("userLogin", req.session.userLogin, { maxAge: 6000 * 30 });

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};