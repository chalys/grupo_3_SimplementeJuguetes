const db = require("../../../dataBase/models");

module.exports = async (req, res) => {
  const query = `
  SELECT 
  'Total de usuarios' AS title,
  'primary' AS color,
  'user' AS icon,
  COUNT(id) AS digit FROM users

  UNION ALL

  SELECT 
  'Total de productos' AS title, 
  'danger' AS color,
  'book' AS icon,
  COUNT(id) AS digit FROM products
  
  UNION ALL

  SELECT 
  'Total de categorias' AS title, 
  'success' AS color,
  'list' AS icon,
  COUNT(id) AS digit FROM categories
  
  UNION ALL

  SELECT 
  'Total de ordenes' AS title, 
  'warning' AS color,
  'cart-shopping' AS icon,
  COUNT(id) AS digit FROM orders
  `;

  try {
    const [data] = await db.sequelize.query(query);

    return res.status(200).json({
      ok: true,
      data,
    });

  } catch (error) {
    res.status(error.status || 500).json({
      ok: false,
      msg: error.message,
    });
  }

};
