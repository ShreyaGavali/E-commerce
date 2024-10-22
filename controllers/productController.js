import Product from '../models/productModel.js';

// create
export const createProduct = (async (req, res) => {
    const newProduct = new Product({
        ...req.body,
        img: req.file.path
    });
    try{
        const savedProduct = await newProduct.save();
        return res.status(200).json(savedProduct);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

// update
export const updateProduct = (async (req, res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        return res.status(200).json(updatedProduct);
    }catch(err){
        return res.status(500).json(err);
    }
});

// delete
export const deleteProduct = (async (req, res) => {
    try{
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json("Product has been deleted");
    }catch(err){
        return res.status(500).json(err);
    }
});

// get 
export const getProduct = (async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }catch(err){
        return res.status(500).json(err);
    }
});

// get products by category
export const getProductByCategory = (async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        let products;
        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(1)
        }else if(qCategory){
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        }else{
            products = await Product.find();
        }
        return res.status(200).json(products);
    }catch (err){
        return res.status(500).json(err);
    }
});