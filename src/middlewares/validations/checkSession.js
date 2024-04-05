
module.exports =(req,res,next)=>{


    if (req.session.userlogin) {
        res.local.userlogin = req.session.userlogin //obtiene la info de la sesion en la vista

    }
    next();
};
