import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name : String,
    price : Number,
    description : String,
    image : String,
    countInStock : Number,

},
    {timestamps : true }
);

export default mongoose.model("Product", productSchema, 'products');