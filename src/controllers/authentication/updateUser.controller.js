const path = require("path");
const fs = require("fs");
const { loadData, saveData } = require("../../dataBase");
const { validationResult } = require("express-validator");

module.exports = (req, res) => {
  const errors = validationResult(req);
  const { id } = req.params;
  const users = loadData("users");
  const loadProvince = loadData("province");

  if (errors.isEmpty()) {
    //Si no existe errores
    const userPicture = req.file;
    const {
      name,
      province,
      locality,
      postal,
      street,
      streetNumber,
      floor,
      betweenSt1,
      betweenSt2,
      phoneNumber,
      indications,
    } = req.body;

    const usersMapped = users.map((u) => {
      if (u.id === +id) {
        const userUpdate = {
          ...u,
          name: name.trim(),
          userPicture: userPicture? userPicture.filename : u.userPicture, // image:image ? image.filename : "default-image.png"
          province: province.trim(),
          locality: locality.trim(),
          postal: postal.trim(),
          street: street.trim(),
          streetNumber: streetNumber.trim(),
          floor: floor.trim(),
          betweenSt1: betweenSt1.trim(),
          betweenSt2: betweenSt2.trim(),
          phoneNumber: phoneNumber.trim(),
          indications: indications.trim(),
        };
        if (userPicture?.filename) {
          const pathBeforeFile = path.join(
            __dirname,
            `../../../public/images/authentication/` + u.userPicture
          );
          const existFile = fs.existsSync(pathBeforeFile);
          if (existFile) {
            fs.unlinkSync(pathBeforeFile);
          }
        }

        return userUpdate;
      }
      return u;
    });

    saveData(usersMapped, "users");
    res.redirect(`/autenticacion/editar-usuario/${id}`);
  } else {
    //si existe errores entonces
    const userFind = users.find((u) => u.id === +id);
    const errorsMapped = errors.mapped();

    res.render(
      "./authentication/editUser",
      {
        user: userFind,
        province: loadProvince,
        errors: errorsMapped,
        old: req.body,
      }
    );
  }
};