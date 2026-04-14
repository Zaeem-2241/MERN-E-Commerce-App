import Product from "../models/products.js";

// console.log(Product);

const getProduct = async (req, res) => {
  // console.log(req.query);

  try {
    const pageSize = 6;
    const page = Number(req.query.page) || 1;
    console.log(req.body);

    const Keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const priceFilter = {};

    if (req.query.minPrice) {
      priceFilter.$gte = Number(req.query.minPrice);
    }

    if (req.query.maxPrice) {
      priceFilter.$lte = Number(req.query.maxPrice);
    }

    const filter = {
      ...Keyword,
      ...(Object.keys(priceFilter).length > 0 && { price: priceFilter }),
    };
    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "product not found" });
  }
};
export default getProduct;
