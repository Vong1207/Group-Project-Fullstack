import { User, Product } from "./schema.js";
import { hashPassword } from '../bcrypt/bcrypt.js';

// This file is used to automatically create sample data for the database
await User.deleteMany()
    .then(() => {
        console.log('Deleted All Users');
    })
    .then(async () => {
        const users = [
            {
                username: 'vongtran2002',
                password: await hashPassword('Camtien120703!'),
                role: 'Customer',
                displayName: 'Vong Tran',
                customerAddress: '702 Nguyen Van Linh, District 7, Ho Chi Minh City'
            },
            {
                username: 's4012094',
                password: await hashPassword('Camtien120703!'),
                role: 'Vendor',
                businessName: `Vong The Vendor`,
                businessAddress: '702 Nguyen Van Linh, District 7, Ho Chi Minh City'
            },
            {
                username: 'vongtran2112',
                password: await hashPassword('Camtien120703!'),
                role: 'Shipper',
                displayName: 'Tran Vong',
                distributionHub: 'Ho Chi Minh'
            }
        ];

        // Save documents to collection
        await User.insertMany(users);
        console.log('User Data Seeded');
    })
    .catch((err) => {
        console.error('Error seeding user data:', err);
    });

await Product.deleteMany()
    .then(() => {
        console.log('Deleted All Products');
    })
    .then(async () => {
        const vendor = await User.findOne({ role: 'Vendor' });

        const products = [
            {
                postedBy: vendor._id,
                productName: 'Rainbow HOLO Playing Cards By TCC Fashion',
                productImage: '/product/rainbowHolo.png',
                productPrice: 300000,
                category: 'Playing Cards & Toys'
            },
            {
                postedBy: vendor._id,
                productName: 'Wilson Airless Gen1 Basketball',
                productImage: '/product/airlessGen1.jpg',
                productPrice: 65000000,
                category: 'Sports'
            },
            {
                postedBy: vendor._id,
                productName: 'Orbit Black Hole Playing Cards',
                productImage: '/product/orbitBlackHole.png',
                productPrice: 380000,
                category: 'Playing Cards & Toys'
            }
        ];

        // Save documents to collection
        await Product.insertMany(products);
        console.log('Product Data Seeded');
    })
    .catch((error) => {
        console.error('Error seeding product data:', error);
    })

// End script
process.exit(0);
