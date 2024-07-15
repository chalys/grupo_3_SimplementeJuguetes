const db = require("../../dataBase/models");

module.exports = (req, res) => {
  const { name,
    
    province,
    city,
    postal,
    street,
    streetNumber,
    floor,
    betweenSt1,
    betweenSt2,
    phoneNumber,
    indications,
   } = req.body;
 
  const userPicture = req.file?.filename;

  db.user.update(
      {
        name: name?.trim(),
        province: province?.trim(),
        locality: city?.trim(),
        postal: postal.trim(),
        street: street.trim(),
        streetNumber: streetNumber.trim(),
        floor: floor.trim(),
        betweenSt1: betweenSt1.trim(),
        betweenSt2: betweenSt2.trim(),
        phoneNumber: phoneNumber.trim(),
        indications: indications.trim(),
        userPicture,
      },
      {
        where: { id: req.session?.userLogin?.id },
      }
    )
    .then(() => {
//      res.redirect("/usuario/perfil");
        res.redirect("/usuario/perfil?success=true");
    })
    .catch((error) => {
      res.status(500).send("Error al actualizar el perfil del usuario.");
    });
};
