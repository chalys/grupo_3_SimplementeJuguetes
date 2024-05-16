const db = require("../../../dataBase/models");

module.exports = async (req, res) => {
  try {
    const products = await db.product.findAll({
      include: ["Category"],
      attributes: ["id", "name", "description", "categoryId"],
      //raw: true, // To get raw data from the database
    });

    // Count total products
    const count = products.length;

    // Count products by category
    const countByCategory = products.reduce((acc, product) => {
      const categoryId = product.categoryId;
      if (acc[categoryId]) {
        acc[categoryId]++;
      } else {
        acc[categoryId] = 1;
      }
      return acc;
    }, {});

    // Format products with required fields
    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      categories: [product.categoryId],
      detail: `/api/products/${product.id}`, // Assuming this is the URL structure for detail endpoint
    }));

    res.status(200).json({
      count,
      countByCategory,
      products: formattedProducts,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err.message,
    });
  }
};