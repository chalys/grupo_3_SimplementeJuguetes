const db = require('../../dataBase/models');

module.exports = (req,res) => {
    const { id } = req.params;
    const categoryPromise = db.category.findByPk(id)
    Promise.all([categoryPromise])
    .then(([category]) => {  
      res.render("categories/editCategory", {category}
      );
    })
}
