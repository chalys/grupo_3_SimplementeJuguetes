const db = require("../../../dataBase/models");
module.exports = (req,res)=>{
    db.category
    .findAll()
    .then((categories)=>{
        res.status(200).json({
          ok: true,
          data: categories,
        });
      })
      .catch((err) => {
        res.status(500).json({
          ok: false,
          msg: err.message,
        });
      })
}