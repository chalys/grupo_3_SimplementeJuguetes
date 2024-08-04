module.exports = {
    registro: require("./registro.controller"),
    registro1: require("./nuevoUsuario.controller"),
    registro2: require("./registro2.controller"),
    login : require("./login.controller"),
    listUser:require("./listUser.controller"),
    registerUser:require("./registerUser.controller"),
    editUser:require("./editUser.controller"),
    updateUser:require("./updateUser.controller"),
    loginProcess:require("./loginProcess.controller"),
    errorAuth:require("./errorAuth.controller"),
    logout: require("./logout.controller"),
    loginAndRegisterGoogle: require("./loginAndRegisterGoogle.controller"),
    loginAndRegisterFacebook: require("./loginAndRegisterFacebook.controller")
}