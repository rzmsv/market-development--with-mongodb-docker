const Product = require("../models/products")
const { findById } = require("../models/user")

// GET

exports.GetaddProduct = (req,res,next)=>{
    res.render("add-product",{title: "Admin Page",authHeader:req.session.user,loggedIn : req.session.isLoggedIn})
}

exports.adminGetProducts = (req,res,next)=>{
    Product.find()
    // .populate("userId")
    .then((result)=>{
        res.render("admin",{title: "Admin Products Page",products : result,authHeader:req.session.user,loggedIn : req.session.isLoggedIn})
    })
    .catch(err =>{
        console.log(err)
        res.redirect("/")
    })
}

exports.adminGetEditProduct = (req,res,next)=>{

    let id = req.params.id
    Product.findById(id)
    .then((product)=>{
        // console.log(product)
        res.render("editProduct",{title: "Admin Edit Page",authHeader:req.session.user,loggedIn : req.session.isLoggedIn,prod:product})
    })
    .catch()
}



//POST

exports.PostaddProduct = (req,res,next)=>{
    let title = req.body.title
    let description = req.body.description
    let price = req.body.price
    let imageUrl = req.body.imageUrl
    Product.create({
        title : title,
        description : description,
        price : price,
        imageUrl : imageUrl,
        userId : req.session.user._id
    })
    .then(()=>{
        
        res.redirect("/admin/add-product")
    })
    .catch(err => {
        console.log(err)
        res.redirect("/")
    })
}

exports.adminPostEditProduct = (req,res,next)=>{
    let title = req.body.title
    let description = req.body.description
    let price = req.body.price
    let imageUrl = req.body.imageUrl
    let id = req.body.id
    Product.findByIdAndUpdate(id,{
        title : title,
        description : description,
        price : price,
        imageUrl : imageUrl
    })
    .then((edit)=>{
        edit.save()
        res.redirect("/admin")
    })
    .catch(err => {
        console.log(err)
        res.redirect("/admin")
    })
}