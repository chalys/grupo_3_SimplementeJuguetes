const router = require("express").Router();
const {
  getOrder,
  addProductToOrder,
  removeProductToOrder,
  moreQuantity,
  lessQuantity,
  canceledOrder,
  completedOrder,
  listOrderCompleted,
} = require("../../controllers/api/cart");

/* /api/cart */
router.get("/", getOrder);

router.patch("/add/:id", addProductToOrder);

router.patch("/remove/:id", removeProductToOrder);

router.patch("/more/:id", moreQuantity);

router.patch("/less/:id", lessQuantity)

router.patch("/canceled", canceledOrder)

router.patch("/completed", completedOrder)

router.get("/listOrderCompleted", listOrderCompleted)

module.exports = router;