import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Product from './models/products.js'; // Ensure path is correct

// Replace with your actual MongoDB URI
const MONGO_URI = "mongodb://localhost:27017/";

const seedProducts = async () => {
    try {
        // 1. Connect to Database
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected for seeding...");

        // 2. Clear existing products (Optional: prevents duplicates)
        await Product.deleteMany();
        console.log("Existing products cleared.");

        const products = [];

        // 3. Generate 100 products
        for (let i = 0; i < 100; i++) {
            products.push({
                name: faker.commerce.productName(),
                price: parseFloat(faker.commerce.price({ min: 10, max: 2000 })),
                description: faker.commerce.productDescription(),
                image: `https://picsum.photos/seed/${i}/400/400`, // Better for testing UI
                countInStock: faker.number.int({ min: 0, max: 100 })
            });
        }

        // 4. Insert into Database
        await Product.insertMany(products);
        console.log("Successfully seeded 100 products!");

        // 5. Exit process
        mongoose.connection.close();
        process.exit();

    } catch (error) {
        console.error("Error with seeding:", error);
        process.exit(1);
    }
};

seedProducts();