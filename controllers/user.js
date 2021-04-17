const Products = require("../models/products")
const User = require("../models/user")
//GET

exports.getAllProducts = (req,res,next)=>{
    Products.find()
    // .populate("userId")
    .then((result)=>{
        res.render("home",{title: "Products Page",products : result,authHeader:req.session.user,loggedIn : req.session.isLoggedIn})
    })
    .catch(err =>{
        console.log(err)
        res.redirect("/")
    })
}

exports.getDetails = (req,res,next)=>{
    let id = req.params.id
    Products.findById(id)
    .then((result)=>{
        console.log(result)
        res.render("detail",{result:result})
    })
    .catch(err=>{
        console.log(err)
        res.redirect("/")
    })
}

exports.getCartPage = (req,res,next)=>{
    User.findById(req.session.user._id)
    .populate("cart.items.productId")
    .then((result)=>{
        res.render("cart",{title: "Your cart",userProducts:result.cart.items,authHeader:req.session.user,loggedIn : req.session.isLoggedIn})
    })
    .catch()
}

exports.getSignup = (req,res,next)=>{
    res.render("signup",{title: "Signup"})
}

exports.getLogin = (req,res,next)=>{
    res.render("login",{title: "Login"})
}

exports.getUserPage = (req,res,next)=>{
    res.render("user",{title: "User page",authHeader:req.session.user,loggedIn : req.session.isLoggedIn})
}

exports.getAdminPage = (req,res,next)=>{
    res.render("admin",{title: "Admin page"})
}

//POST

exports.addToCard = (req,res,next)=>{
    const prodId = req.body.productId
    Products.findById(prodId)
    .then((productResult)=>{
        // console.log(productResult._id)
        User.findByIdAndUpdate(req.session.user._id)
        .then((resultUser)=>{
            // console.log(resultUser.cart.items)
            if (resultUser.cart.items.length > 0){
                let found = resultUser.cart.items.find((v)=>{
                   return  v.productId == prodId
                })

                if (found){
                    found.quantity = found.quantity + 1
                        resultUser.save()
                        res.redirect("/cart")
                }else if (!found){
                    resultUser.cart.items.push({productId:prodId,quantity: 1})
                        resultUser.save()
                        res.redirect("/cart")
                }
            }else{
                // let quantity = result.cart.items.length + 1
                let product =resultUser.cart.items.push({productId:prodId,quantity: 1})
                resultUser.save()
                res.redirect("/cart")
                
            }

        })
        .catch(err => {
        console.log(err)
        res.redirect("/cart")
    })
    })
    .catch(err => {
        console.log(err)
        res.redirect("/cart")
    })
}

exports.postDeleteCartPage = (req,res,next)=>{
    let prodId = req.body.productId
    Products.findById(prodId)
    .then((productResult)=>{
        User.findByIdAndUpdate(req.session.user._id)
        .then((userResult)=>{
            let found = userResult.cart.items.find((v)=>{
                return  v.productId == prodId
             })
            if (found.quantity > 1){
                found.quantity = found.quantity - 1
                userResult.save()
                res.redirect("/cart")
            }
            else if (found.quantity == 1){
                let indexProd = userResult.cart.items.indexOf(found)
                userResult.cart.items.splice(indexProd,1)
                userResult.save()
                res.redirect("/cart")
            }
        })
        .catch(err => {
            console.log(err)
            res.redirect("/cart")
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect("/cart")
    })
}

exports.postSignup = (req,res,next)=>{
    let name = req.body.name
    let lastname = req.body.lastname
    let user = req.body.user
    let email = req.body.email
    let password = req.body.password
    let confirmPassword = req.body.confirmPassword
    if (password == confirmPassword){
        User.create({
            name : name,
            lastname : lastname,
            user : user,
            email : email,
            password : password,
            confirmPassword : confirmPassword
        })
        .then((result)=>{
            console.log(result)
            result.save()
            res.redirect("/")
        })
        .catch(err=>{
            console.log(err)
            res.redirect("/signup")
        })
    }else{
        res.json({
            msg : "password & confirm password should be equal!"
        })
    }

}

exports.postLogin = (req,res,next)=>{
    let email = req.body.email
    let password = req.body.password
User.findOne({
    email:email,
    password:password
})
.then((result)=>{
    // console.log(result)
    if (result != null){
        req.session.isLoggedIn = true
        req.session.user = result
        if(req.session.user.admin == true){
            return req.session.save((err)=>{
                console.log(err)
                res.redirect("/admin")
            })
        }
        
        return req.session.save((err)=>{
            console.log(err)
            res.redirect("/")
        })
    }else{
        res.json({
            msg : "Something is wrong maybe mail or password ! Please take a deep breath and try again :) "
        })
    }
})
.catch(err =>{
    console.log(err)
    res.redirect("/")
})
}

exports.logout = (req,res,next)=>{
    req.session.destroy((err)=>{
         console.log(err)
         res.redirect('/')
    })
}