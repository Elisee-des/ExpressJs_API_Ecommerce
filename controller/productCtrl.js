const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');


//Creation d'un produit
const createProduct = asyncHandler(async(req, res) => {
    try
    {
        if(req.body.title)
        {
            req.body.slug = slugify(req.body.title);
        }

        const newProduct = await Product.create(req.body);
        res.json({message:"Donnee enregsitrer avec success",
        data: newProduct})
    }catch(error)
    {
        throw new Error(error);
    }
});


//Recuperer un produit
const getaProduct = asyncHandler(async(req, res) => {
    const { id } = req.params;
    try
    {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    }catch(error)
    {
        throw new Error(error);
    }
})



//Recuperer tout les produits
const getAllProduct = asyncHandler(async(req, res) => {
    try
    {
        const products = await Product.find();
        res.json(products);
    }catch(error)
    {
        throw new Error(error);
    }
})


module.exports={createProduct, getaProduct, getAllProduct}