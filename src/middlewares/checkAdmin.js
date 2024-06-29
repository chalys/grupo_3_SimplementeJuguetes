module.exports = (req, res, next) => {
    if (req.session.userLogin?.role == 2) {
        next()
    } else {
        console.log("No tienes Permisos")
        res.redirect("/")
    }
}