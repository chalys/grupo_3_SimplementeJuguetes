//const checkSession = require("./checkSession");

module.exports = {
    ...require("./products.validation"),//// productsValidationStore y productsValidationUpdate
    ...require("./users.validation"), //// usersValidationStore y userUpdateValidation
    userValidation: require("./user.validation"),
    dataLocal: require("./dataLocal"),
    validactionLogin: require("./validactionLogin"),
    userId: require("./userId"),
}