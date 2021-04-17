exports.isNotAuth = (req,res,next)=>{
    if(!req.session.isLoggedIn){
        return res.redirect("/login")
    }
    next()
}

exports.isAuth = (req,res,next)=>{
    if(req.session.isLoggedIn){
        return res.redirect("/")
    }
    next()
}

exports.userPage = (req,res,next)=>{
    if (!req.session.user.admin == false){
        return res.redirect("/login")
    }
    next()
}

exports.adminPage = (req,res,next)=>{
    if (!req.session.user.admin == true){
        return res.redirect("/login")
    }
    next()
}