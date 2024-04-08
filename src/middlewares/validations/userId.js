module.exports = (req,res,next) => {
    res.locals.userId = req.params.id; // Pasando el ID del usuario como una variable local
    next();
};