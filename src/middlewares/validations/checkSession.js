
module.exports =(req,res,next)=>{


    if (req.session.userLogin) {
        res.locals.userLogin = req.session.userLogin //obtiene la info de la sesion en la vista

    }
    next();
};
