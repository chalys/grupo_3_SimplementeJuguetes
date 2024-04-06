module.exports = (req, res, next) => { //CRPG
    if(req.session.userLogin){
        res.locals.userLogin = res.locals.userLogin
    }

    next()
};