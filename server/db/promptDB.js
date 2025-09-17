/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Vu Linh
// # ID: 3999487 */
import { User, Product, Order } from "./schema.js";
import { hashPassword } from "../bcrypt/bcrypt.js";

// This file is used to automatically create sample data for the database
await User.deleteMany()
  .then(() => {
    console.log("Deleted All Users");
  })
  .then(async () => {
    const users = [
      {
        username: "vongtran2002",
        password: await hashPassword("Camtien120703!"),
        role: "Customer",
        displayName: "Vong Tran",
        customerAddress: "702 Nguyen Van Linh, District 7, Ho Chi Minh City",
      },
      {
        username: "s4012094",
        password: await hashPassword("Camtien120703!"),
        role: "Vendor",
        businessName: `Vong The Vendor`,
        businessAddress: "702 Nguyen Van Linh, District 7, Ho Chi Minh City",
      },
      {
        username: "vongtran2112",
        password: await hashPassword("Camtien120703!"),
        role: "Shipper",
        displayName: "Tran Vong",
        distributionHub: "Ho Chi Minh",
      },
    ];

    // Save documents to collection
    await User.insertMany(users);
    console.log("User Data Seeded");
  })
  .catch((err) => {
    console.error("Error seeding user data:", err);
  });

await Product.deleteMany()
  .then(() => {
    console.log("Deleted All Products");
  })
  .then(async () => {
    const vendor = await User.findOne({ role: "Vendor" });

    const products = [
      //playing cards & toys
      {
        postedBy: vendor._id,
        productName: "LEGO Batmobile Set",
        productImage: "/product/card&toy1.png",
        productPrice: 690000,
        category: "Playing Cards & Toys",
        description:
          "Buildable LEGO Batmobile with rugged tires and an exclusive Batman minifigure. Great for both play and display.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Minions Bob Figure",
        productImage: "/product/card&toy2.png",
        productPrice: 320000,
        category: "Playing Cards & Toys",
        description:
          "Cute Minions figure in prison outfit with detailed paint and sturdy build, perfect for collectors and fans alike.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "RX-78-2 Gundam Toy",
        productImage: "/product/card&toy3.png",
        productPrice: 850000,
        category: "Playing Cards & Toys",
        description:
          "Highly detailed RX-78-2 Gundam action figure with articulated joints and authentic color scheme for collectors and fans.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Vintage Mini Car",
        productImage: "/product/card&toy4.png",
        productPrice: 270000,
        category: "Playing Cards & Toys",
        description:
          "Classic miniature car model with vintage cream finish and realistic detailing. Ideal for display or toy collectors.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Classic Tin Robot",
        productImage: "/product/card&toy5.png",
        productPrice: 210000,
        category: "Playing Cards & Toys",
        description:
          "Retro-style wind-up robot made of tin with vibrant paint and moving limbs, a nostalgic toy for collectors.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Black Gold Cards",
        productImage: "/product/card&toy6.png",
        productPrice: 180000,
        category: "Playing Cards & Toys",
        description:
          "Premium deck of playing cards with intricate black and gold design, perfect for magic, games, or collectors.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Monarchs Cards",
        productImage: "/product/card&toy7.png",
        productPrice: 240000,
        category: "Playing Cards & Toys",
        description:
          "High-end deck of Monarchs playing cards with elegant black and gold foil. Favored by magicians and collectors worldwide.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Bicycle Cards Blue",
        productImage: "/product/card&toy8.png",
        productPrice: 95000,
        category: "Playing Cards & Toys",
        description:
          "Classic blue Bicycle deck trusted by professionals and casual players alike. Smooth finish and durable cardstock.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "UNO Minimalist Deck",
        productImage: "/product/card&toy9.png",
        productPrice: 145000,
        category: "Playing Cards & Toys",
        description:
          "Stylish UNO deck designed by Warleson Oliveira. Same fun gameplay in a sleek, modern look. Perfect for all ages.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Rainbow HOLO Cards",
        productImage: "/product/card&toy10.png",
        productPrice: 300000,
        category: "Playing Cards & Toys",
        description:
          "Elegant drop earrings with pearl accents and silver-tone planetary design, perfect for evening events and galas.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Wilson Airless Ball",
        productImage: "/product/card&toy12.png",
        productPrice: 380000,
        category: "Playing Cards & Toys",
        description:
          "The Wilson Airless Gen1 Basketball is a groundbreaking innovation in sports equipment. Designed with a futuristic 3D-printed lattice structure, this basketball does not require any air and never needs to be pumped. Despite being airless, it offers the same weight, bounce, and size as a regulation basketball.",
        stockQuantity: 100,
      },
      // Sprots
      {
        postedBy: vendor._id,
        productName: "Nike All-Field Ball",
        productImage: "/product/sport1.png",
        productPrice: 490000,
        category: "Sports",
        description:
          "Durable Nike American football designed for all-field use. Premium grip and construction for both training and casual play.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Outdoor Basketball",
        productImage: "/product/sport2.png",
        productPrice: 220000,
        category: "Sports",
        description:
          "Durable rubber basketball with deep channels for improved grip and control. Ideal for outdoor courts and practice sessions.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Blue Tennis Racket",
        productImage: "/product/sport3.png",
        productPrice: 670000,
        category: "Sports",
        description:
          "Lightweight tennis racket made of graphite composite for better swing control and power. Great for beginners and intermediates.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Indoor PU Basketball",
        productImage: "/product/sport4.png",
        productPrice: 340000,
        category: "Sports",
        description:
          "High-quality indoor basketball made with soft PU leather for a professional feel and excellent bounce performance.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Mini Basketball Toy",
        productImage: "/product/sport5.png",
        productPrice: 49000,
        category: "Sports",
        description:
          "Soft mini basketball with textured surface, perfect for kids or stress relief games at home or the office.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Adidas Court Shoes",
        productImage: "/product/sport6.png",
        productPrice: 1150000,
        category: "Sports",
        description:
          "Classic Adidas sneakers with red-blue stripe design. Great for tennis, casual sports, or everyday streetwear style.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Adidas Prophere Mint",
        productImage: "/product/sport7.png",
        productPrice: 1390000,
        category: "Sports",
        description:
          "Bold and stylish mint-colored Adidas Prophere with breathable knit upper and chunky sole. Ideal for running and training.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Adidas POD-S3.1",
        productImage: "/product/sport8.png",
        productPrice: 1290000,
        category: "Sports",
        description:
          "Modern olive green trainers with Boost heel and flexible forefoot. Designed for comfort and urban running performance.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Standard Tennis Ball",
        productImage: "/product/sport9.png",
        productPrice: 25000,
        category: "Sports",
        description:
          "Durable felt tennis ball with consistent bounce. Great for training sessions, practice drills, or casual matches.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "RACE Racing Shoes",
        productImage: "/product/sport10.png",
        productPrice: 1580000,
        category: "Sports",
        description:
          "Engineered for speed, these lightweight racing shoes offer breathable mesh and responsive cushioning for runners.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Red High-Top Shoes",
        productImage: "/product/sport11.png",
        productPrice: 980000,
        category: "Sports",
        description:
          "Bold red high-top sneakers with ankle support and non-slip sole. Designed for both basketball and street fashion.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "TaylorMade P790 Set",
        productImage: "/product/sport12.png",
        productPrice: 8690000,
        category: "Sports",
        description:
          "Premium TaylorMade P790 golf irons with tungsten weighting for enhanced control and distance. Ideal for serious golfers.",
        stockQuantity: 100,
      },
      // Jewelery
      {
        postedBy: vendor._id,
        productName: "Celestial Pearl Drop",
        productImage: "/product/jewelery1.png",
        productPrice: 1450000,
        category: "Jewelery",
        description:
          "Elegant drop earrings with pearl accents and silver-tone planetary design, perfect for evening events and galas.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Ocean Sapphire Ring",
        productImage: "/product/jewelery2.png",
        productPrice: 2200000,
        category: "Jewelery",
        description:
          "A stunning silver ring featuring a central blue sapphire stone surrounded by shimmering diamonds, offering timeless elegance.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Twisted Diamond Band",
        productImage: "/product/jewelery3.png",
        productPrice: 1750000,
        category: "Jewelery",
        description:
          "Minimalist silver band with an elegant twisted design embedded with fine diamonds, ideal for everyday luxury.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Cartier Love Bangle",
        productImage: "/product/jewelery4.png",
        productPrice: 4200000,
        category: "Jewelery",
        description:
          "Iconic Cartier bangle in 18k gold finish, secured with signature screw motifs, a symbol of eternal love and luxury.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Emerald Whisper Ring",
        productImage: "/product/jewelery5.png",
        productPrice: 1950000,
        category: "Jewelery",
        description:
          "Slim gold ring with a solitary green emerald centerpiece, refined and understated for elegant wear.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Starlight Charm Band",
        productImage: "/product/jewelery6.png",
        productPrice: 1600000,
        category: "Jewelery",
        description:
          "Silver bracelet adorned with delicate star-shaped charms and diamond-like stones, a twinkling touch for any outfit.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Crystal Bow Earrings",
        productImage: "/product/jewelery7.png",
        productPrice: 2300000,
        category: "Jewelery",
        description:
          "Statement earrings with crystal bows and teardrop gems, designed to add brilliance and charm to formal attire.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Blossom Charm Band",
        productImage: "/product/jewelery8.png",
        productPrice: 1850000,
        category: "Jewelery",
        description:
          "Pink floral charm bracelet decorated with butterfly and flower pendants, perfect for springtime looks.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Infinity Loop Chain",
        productImage: "/product/jewelery9.png",
        productPrice: 2100000,
        category: "Jewelery",
        description:
          "Mixed metal necklace with interlocking rings symbolizing eternal connection, ideal for thoughtful gifts.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Golden Grace Band",
        productImage: "/product/jewelery10.png",
        productPrice: 2600000,
        category: "Jewelery",
        description:
          "Elegant multi-layer gold bracelet adorned with shimmering white stones, offering refined sophistication for special occasions.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Diamond Hoop Pair",
        productImage: "/product/jewelery11.png",
        productPrice: 2200000,
        category: "Jewelery",
        description:
          "Elegant silver hoop earrings inlaid with sparkling diamonds, perfect for elevating both casual and formal outfits.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Vintage Heart Locket",
        productImage: "/product/jewelery12.png",
        productPrice: 1450000,
        category: "Jewelery",
        description:
          "Romantic gold-plated necklace with heart and cameo charms, offering timeless elegance and sentimental style.",
        stockQuantity: 100,
      },
      //Furniture
      {
        postedBy: vendor._id,
        productName: "Modern Beige Sofa",
        productImage: "/product/furniture1.png",
        productPrice: 8500000,
        category: "Furniture",
        description:
          "A spacious beige sofa with soft cushions and indoor plants around, perfect for modern living rooms.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Classic Armchair",
        productImage: "/product/furniture2.png",
        productPrice: 3500000,
        category: "Furniture",
        description:
          "A comfortable wooden armchair with cushioned seat, ideal for reading corners and cozy spaces.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Minimalist CoffeeTbl",
        productImage: "/product/furniture3.png",
        productPrice: 2800000,
        category: "Furniture",
        description:
          "Low-rise wooden coffee table with storage drawers, designed for simplicity and durability.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Blue Velvet Chair",
        productImage: "/product/furniture4.png",
        productPrice: 4200000,
        category: "Furniture",
        description:
          "Elegant round blue lounge chair with velvet finish, includes blanket and pillow for extra comfort.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Wooden Storage Box",
        productImage: "/product/furniture5.png",
        productPrice: 5200000,
        category: "Furniture",
        description:
          "Six-drawer wooden cabinet with decorative items on top, combining functionality and style.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Round Side Table",
        productImage: "/product/furniture6.png",
        productPrice: 1600000,
        category: "Furniture",
        description:
          "Compact round wooden side table with lower shelf for books or decoration pieces.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Modern Display Shelf",
        productImage: "/product/furniture7.png",
        productPrice: 4500000,
        category: "Furniture",
        description:
          "Metal and wood display shelf with multiple compartments, perfect for books and decor.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Luxury King Bed",
        productImage: "/product/furniture8.png",
        productPrice: 11500000,
        category: "Furniture",
        description:
          "A large upholstered king bed with soft headboard and layered pillows for premium comfort.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Executive Desk",
        productImage: "/product/furniture9.png",
        productPrice: 9800000,
        category: "Furniture",
        description:
          "Modern executive desk with drawers and side storage, made of premium oak wood.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Elegant TV Console",
        productImage: "/product/furniture10.png",
        productPrice: 6500000,
        category: "Furniture",
        description:
          "Stylish TV console with open shelves, perfect for living rooms with a contemporary design.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Emerald Lounge Chair",
        productImage: "/product/furniture11.png",
        productPrice: 4200000,
        category: "Furniture",
        description:
          "Modern emerald green lounge chair with soft fabric and swivel base, designed for comfort and a pop of color in any living room.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Nordic Study Desk",
        productImage: "/product/furniture12.png",
        productPrice: 6500000,
        category: "Furniture",
        description:
          "Minimalist Nordic-style wooden study desk with built-in drawers and shelving, offering both functionality and aesthetic appeal.",
        stockQuantity: 100,
      },
      // watch
      {
        postedBy: vendor._id,
        productName: "Seiko Chronograph",
        productImage: "/product/Watch_1.png",
        productPrice: 7200000,
        category: "Watches",
        description:
          "A stylish Seiko chronograph watch with stainless steel strap, precise quartz movement, and modern sporty design.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Timex White Dial",
        productImage: "/product/Watch_2.png",
        productPrice: 1800000,
        category: "Watches",
        description:
          "Elegant Timex watch featuring a white dial with numeric markers and a durable stainless steel strap, ideal for daily wear.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Fossil Chrono Watch",
        productImage: "/product/Watch_3.png",
        productPrice: 4500000,
        category: "Watches",
        description:
          "Fossil men’s chronograph watch with a leather strap, multifunction dials, and a bold classic design.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Seiko Diver Auto",
        productImage: "/product/Watch_4.png",
        productPrice: 9500000,
        category: "Watches",
        description:
          "Seiko diver’s watch with automatic movement, luminous dial, and water resistance for professional diving.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Rolex Submariner",
        productImage: "/product/Watch_5.png",
        productPrice: 280000000,
        category: "Watches",
        description:
          "Luxury Rolex Submariner with black dial, gold and silver two-tone bracelet, and automatic Swiss movement.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Rolex Oyster Black",
        productImage: "/product/Watch_6.png",
        productPrice: 160000000,
        category: "Watches",
        description:
          "Classic Rolex Oyster Perpetual featuring a matte black dial, steel case, and timeless Swiss craftsmanship.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Omega Seamaster",
        productImage: "/product/Watch_7.png",
        productPrice: 115000000,
        category: "Watches",
        description:
          "Bold Omega Seamaster chronograph with a deep blue dial, stainless steel case, and water resistance for divers.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Amphibian Leather",
        productImage: "/product/Watch_8.png",
        productPrice: 3200000,
        category: "Watches",
        description:
          "A classic Amphibian automatic watch with vintage leather strap and clean white dial, offering timeless elegance.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Rolex Datejust Gold",
        productImage: "/product/Watch_9.png",
        productPrice: 135000000,
        category: "Watches",
        description:
          "Rolex Datejust with a gold-tone bezel and bracelet, featuring an elegant white dial and automatic Swiss movement.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Nixon Rose Minimal",
        productImage: "/product/Watch_10.png",
        productPrice: 3800000,
        category: "Watches",
        description:
          "Minimalist Nixon watch in rose gold with a clean dial, slim profile, and stainless steel bracelet.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Breitling Avenger",
        productImage: "/product/Watch_11.png",
        productPrice: 145000000,
        category: "Watches",
        description:
          "Breitling Super Avenger with bold chronograph dials, black rubber strap, and a rugged stainless steel bezel for adventurers.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Timex Black Dial",
        productImage: "/product/Watch_12.png",
        productPrice: 2500000,
        category: "Watches",
        description:
          "Minimalist Timex watch featuring a black dial, slim case, and stainless steel bracelet, suitable for both casual and formal wear.",
        stockQuantity: 100,
      },
      //Home Appliances
      {
        postedBy: vendor._id,
        productName: "Drip Coffee Maker",
        productImage: "/product/appliance1.png",
        productPrice: 950000,
        category: "Home Appliances",
        description:
          "Compact drip coffee maker with a transparent glass carafe and easy one-button operation.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Digital Air Fryer",
        productImage: "/product/appliance2.png",
        productPrice: 1500000,
        category: "Home Appliances",
        description:
          "Modern white digital air fryer with gold handle for oil-free, healthy cooking.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Compact Toaster Oven",
        productImage: "/product/appliance3.png",
        productPrice: 2200000,
        category: "Home Appliances",
        description:
          "Stylish green toaster oven with multiple cooking functions and LED display.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Ceramic Dinnerware",
        productImage: "/product/appliance4.png",
        productPrice: 1800000,
        category: "Home Appliances",
        description:
          "Durable ceramic dinnerware set including plates and bowls for family dining.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Dual Trash Bin",
        productImage: "/product/appliance5.png",
        productPrice: 1200000,
        category: "Home Appliances",
        description:
          "Eco-friendly trash bin with dual compartments and foot pedal opening system.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Electric Kettle",
        productImage: "/product/appliance6.png",
        productPrice: 750000,
        category: "Home Appliances",
        description:
          "Elegant cream-colored electric kettle with wooden handle for quick boiling.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Steel Cookware Set",
        productImage: "/product/appliance7.png",
        productPrice: 3500000,
        category: "Home Appliances",
        description:
          "Premium stainless steel cookware set with pots, pans, and lids for versatile cooking.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Stand Mixer",
        productImage: "/product/appliance8.png",
        productPrice: 4800000,
        category: "Home Appliances",
        description:
          "High-performance stand mixer with multiple speed settings for baking and mixing.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Bread Toaster",
        productImage: "/product/appliance9.png",
        productPrice: 600000,
        category: "Home Appliances",
        description:
          "Retro-style bread toaster with dual slots, perfect for quick breakfasts.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Cordless Vacuum",
        productImage: "/product/appliance10.png",
        productPrice: 2700000,
        category: "Home Appliances",
        description:
          "Lightweight cordless vacuum cleaner with powerful suction for home cleaning.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Klarstein Dishwasher",
        productImage: "/product/appliance11.png",
        productPrice: 12500000,
        category: "Home Appliances",
        description:
          "High-capacity Klarstein built-in dishwasher with energy-efficient design, multiple washing modes, and sleek black finish.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Cleaning Brush Set",
        productImage: "/product/appliance12.png",
        productPrice: 350000,
        category: "Home Appliances",
        description:
          "Durable cleaning brush set with multiple heads and a compact holder, ideal for maintaining hygiene in kitchen and bathroom.",
        stockQuantity: 100,
      },
      // beauty products
      {
        postedBy: vendor._id,
        productName: "Glossier Bounce",
        productImage: "/product/beauty_1.png",
        productPrice: 450000,
        category: "Beauty Products",
        description:
          "Hydrating serum enriched with hyaluronic acid and vitamin B5 for smoother, plumper skin.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Curology Set",
        productImage: "/product/beauty_2.png",
        productPrice: 650000,
        category: "Beauty Products",
        description:
          "Complete skincare kit with cleanser, custom treatment, and moisturizer designed for healthy skin.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Curology Cleanser",
        productImage: "/product/beauty_3.png",
        productPrice: 280000,
        category: "Beauty Products",
        description:
          "Gentle daily cleanser that removes impurities without stripping the skin of natural moisture.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Cocooil Body Oil",
        productImage: "/product/beauty_4.png",
        productPrice: 520000,
        category: "Beauty Products",
        description:
          "Natural organic coconut oil for nourishing skin, providing deep hydration and radiant glow.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Sesderma Foamy Cream",
        productImage: "/product/beauty_5.png",
        productPrice: 490000,
        category: "Beauty Products",
        description:
          "Foamy cream cleanser designed for acne-prone skin, helps purify and control excess oil.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Benton Body Lotion",
        productImage: "/product/beauty_6.png",
        productPrice: 350000,
        category: "Beauty Products",
        description:
          "Moisturizing lotion with shea butter and coconut oil, leaving skin soft and nourished.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Jo Malone Cologne",
        productImage: "/product/beauty_7.png",
        productPrice: 2200000,
        category: "Beauty Products",
        description:
          "Luxury cologne blending fresh blackberry and bay leaf scents, creating a timeless fragrance.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Blank Be Perfume",
        productImage: "/product/beauty_8.png",
        productPrice: 1600000,
        category: "Beauty Products",
        description:
          "Elegant floral fragrance with notes of vanilla and jasmine, perfect for daily use.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Glossier Serums",
        productImage: "/product/beauty_9.png",
        productPrice: 720000,
        category: "Beauty Products",
        description:
          "Set of two bestselling Glossier serums: Super Glow with Vitamin C and Super Bounce with hyaluronic acid.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Hylastra Gold Serum",
        productImage: "/product/beauty_10.png",
        productPrice: 890000,
        category: "Beauty Products",
        description:
          "Ultra-hydrating serum with hyaluronic acid and gold peptides for youthful, radiant skin.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Evanhealy Oil",
        productImage: "/product/beauty_11.png",
        productPrice: 420000,
        category: "Beauty Products",
        description:
          "Certified organic rosehip seed oil from Chile, ideal for scarred, blemished, and hyperpigmented skin. A natural solution for skin repair and nourishment.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "ActAcre Hair Mask",
        productImage: "/product/beauty_12.png",
        productPrice: 550000,
        category: "Beauty Products",
        description:
          "A deeply restorative hair mask that hydrates and strengthens hair fibers, improving elasticity and shine while reducing breakage.",
        stockQuantity: 100,
      },
      //Men's Wear
      {
        postedBy: vendor._id,
        productName: "Beige Casual Jacket",
        productImage: "/product/menwear1.png",
        productPrice: 1200000,
        category: "Men's Wear",
        description:
          "Lightweight beige jacket with snap buttons and chest pockets, perfect for casual or semi-formal occasions.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Classic Black Pants",
        productImage: "/product/menwear2.png",
        productPrice: 750000,
        category: "Men's Wear",
        description:
          "Slim-fit black trousers designed for comfort and versatility, ideal for work or casual outings.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Beige Formal Chinos",
        productImage: "/product/menwear3.png",
        productPrice: 800000,
        category: "Men's Wear",
        description:
          "Stylish beige chinos with a modern cut, offering both comfort and sophistication for daily wear.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Star Patch Cap",
        productImage: "/product/menwear4.png",
        productPrice: 350000,
        category: "Men's Wear",
        description:
          "Trendy baseball cap with star patch design, adds a stylish touch to casual outfits.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Nike Black Hoodie",
        productImage: "/product/menwear5.png",
        productPrice: 1100000,
        category: "Men's Wear",
        description:
          "Comfortable black hoodie by Nike, featuring the iconic logo, perfect for sports and casual wear.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Black Puffer Jacket",
        productImage: "/product/menwear6.png",
        productPrice: 1500000,
        category: "Men's Wear",
        description:
          "Warm and durable puffer jacket with hood, designed to keep you cozy in colder seasons.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Navy Oversized Tee",
        productImage: "/product/menwear7.png",
        productPrice: 400000,
        category: "Men's Wear",
        description:
          "Minimalist navy blue oversized t-shirt, offering comfort and a relaxed streetwear vibe.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Beige Ribbed Polo",
        productImage: "/product/menwear8.png",
        productPrice: 550000,
        category: "Men's Wear",
        description:
          "Textured ribbed polo shirt in beige, combining classic style with modern comfort.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Striped Polo Shirt",
        productImage: "/product/menwear9.png",
        productPrice: 600000,
        category: "Men's Wear",
        description:
          "Casual polo shirt with black vertical stripes, offering a timeless and versatile design.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Green Polo Shirt",
        productImage: "/product/menwear10.png",
        productPrice: 700000,
        category: "Men's Wear",
        description:
          "Long-sleeve green polo shirt with a relaxed fit, perfect for layering and casual wear.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Spider Navy Tee",
        productImage: "/product/menwear11.png",
        productPrice: 350000,
        category: "Men's Wear",
        description:
          "Bold navy T-shirt featuring a striking spider graphic design. Made from breathable cotton, perfect for casual streetwear style.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Striped Tee",
        productImage: "/product/menwear12.png",
        productPrice: 280000,
        category: "Men's Wear",
        description:
          "Comfortable oversized T-shirt with white and grey horizontal stripes. Ideal for everyday casual outfits and relaxed wear.",
        stockQuantity: 100,
      },
      // women's wear
      {
        postedBy: vendor._id,
        productName: "Loose Maroon Blouse",
        productImage: "/product/womenwear1.png",
        productPrice: 680000,
        category: "Women's Wear",
        description:
          "A relaxed maroon blouse with a loose fit and classic collar, perfect for casual or office looks.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Brown Satin WrapTop",
        productImage: "/product/womenwear2.png",
        productPrice: 890000,
        category: "Women's Wear",
        description:
          "Elegant satin wrap top in deep brown with waist tie detail for a flattering silhouette.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Beige Satin Set",
        productImage: "/product/womenwear3.png",
        productPrice: 1350000,
        category: "Women's Wear",
        description:
          "Stylish beige satin set including a long sleeve wrap top and wide-leg trousers.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Grey Midi Skirt",
        productImage: "/product/womenwear4.png",
        productPrice: 750000,
        category: "Women's Wear",
        description:
          "Flowy high waist midi skirt in grey fabric with belt, ideal for a feminine and elegant style.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Brown Leather Jacket",
        productImage: "/product/womenwear5.png",
        productPrice: 1200000,
        category: "Women's Wear",
        description:
          "Timeless brown leather biker jacket with zip detailing for a bold fashion statement.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Shearling Coat",
        productImage: "/product/womenwear6.png",
        productPrice: 1500000,
        category: "Women's Wear",
        description:
          "Oversized brown shearling coat with cozy white lining for warmth and winter elegance.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Beige V-Neck Sweater",
        productImage: "/product/womenwear7.png",
        productPrice: 650000,
        category: "Women's Wear",
        description:
          "Comfortable beige ribbed knit sweater with v-neck and button details, soft and casual.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Blue Wide-Leg Jeans",
        productImage: "/product/womenwear8.png",
        productPrice: 820000,
        category: "Women's Wear",
        description:
          "Fashion-forward wide-leg denim jeans with bow detailing for a chic streetwear style.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Black Midi Dress",
        productImage: "/product/womenwear9.png",
        productPrice: 900000,
        category: "Women's Wear",
        description:
          "Versatile black midi dress, comfortable fit suitable for both casual outings and workdays.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Cream Wrap Dress",
        productImage: "/product/womenwear10.png",
        productPrice: 1100000,
        category: "Women's Wear",
        description:
          "Beautiful cream wrap dress with flowy fabric and adjustable tie, perfect for special occasions.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Brown Knit Cardigan",
        productImage: "/product/womenwear11.png",
        productPrice: 750000,
        category: "Women's Wear",
        description:
          "Cozy brown knit cardigan with front buttons and a classic collar, perfect for layering in chilly weather.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Black Flared Skirt",
        productImage: "/product/womenwear12.png",
        productPrice: 680000,
        category: "Women's Wear",
        description:
          "Chic high-waisted black midi skirt with a flared silhouette, ideal for both office and casual wear.",
        stockQuantity: 100,
      },
      // phone
      {
        postedBy: vendor._id,
        productName: "iPhone 14 Pro Max",
        productImage: "/product/phone1.png",
        productPrice: 30990000,
        category: "Phones & Accessories",
        description:
          "Flagship Apple phone with advanced camera system and powerful chip, finished in deep purple for a premium look.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "iPhone 15 Pro Max",
        productImage: "/product/phone2.png",
        productPrice: 33990000,
        category: "Phones & Accessories",
        description:
          "Lightweight titanium design with top-tier performance and enhanced battery life in a stunning white finish.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Galaxy S24 Ultra",
        productImage: "/product/phone3.png",
        productPrice: 36990000,
        category: "Phones & Accessories",
        description:
          "Samsung’s ultimate flagship with advanced AI camera, built-in S Pen, and sleek titanium design.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Galaxy Z Flip6",
        productImage: "/product/phone4.png",
        productPrice: 29990000,
        category: "Phones & Accessories",
        description:
          "Compact and trendy foldable smartphone with Galaxy AI, offering both performance and portability.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Galaxy Z Fold6",
        productImage: "/product/phone5.png",
        productPrice: 46990000,
        category: "Phones & Accessories",
        description:
          "Premium foldable phone with expansive display, perfect for multitasking and immersive media consumption.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "iPhone 16 Case Pink",
        productImage: "/product/phone6.png",
        productPrice: 550000,
        category: "Phones & Accessories",
        description:
          "Vibrant pink official silicone case for iPhone 16 Pro Max with soft-touch finish and MagSafe compatibility.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Apple 20W Adapter",
        productImage: "/product/phone7.png",
        productPrice: 490000,
        category: "Phones & Accessories",
        description:
          "Fast-charging USB-C adapter with Lightning cable included. Compact and reliable for daily use.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Apple MagSafe Pack",
        productImage: "/product/phone8.png",
        productPrice: 2690000,
        category: "Phones & Accessories",
        description:
          "Snap-on wireless charging solution for iPhones with MagSafe, designed for efficiency and portability.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "20k Power Bank C",
        productImage: "/product/phone9.png",
        productPrice: 520000,
        category: "Phones & Accessories",
        description:
          "High-capacity power bank with USB-C interface and dual output ports for reliable on-the-go charging.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Clear MagSafe Case",
        productImage: "/product/phone10.png",
        productPrice: 390000,
        category: "Phones & Accessories",
        description:
          "Durable clear protective case with MagSafe support for iPhone 15, combining clarity with function.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Xiaomi 14T 5G",
        productImage: "/product/phone11.png",
        productPrice: 18990000,
        category: "Phones & Accessories",
        description:
          "Flagship killer from Xiaomi with Leica optics, HyperOS, and 5G connectivity, perfect for performance enthusiasts.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Xiaomi 12 Lite 5G",
        productImage: "/product/phone12.png",
        productPrice: 10990000,
        category: "Phones & Accessories",
        description:
          "Lightweight and stylish 5G smartphone with pastel gradient finish, ideal for everyday use and content creation.",
        stockQuantity: 100,
      },
      // Books
      {
        postedBy: vendor._id,
        productName: "Body Keeps Score",
        productImage: "/product/Book_1.JPG",
        productPrice: 133000,
        category: "Books",
        description:
          "Bessel van der Kolk's groundbreaking work explores how trauma reshapes the body and brain, and how innovative treatments can offer hope and healing.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Everything I Know",
        productImage: "/product/Book_2.JPG",
        productPrice: 115000,
        category: "Books",
        description:
          "Dolly Alderton shares hilarious and heartfelt stories of friendship, heartbreak, and growing up in this celebrated memoir of modern womanhood.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Let Them Theory",
        productImage: "/product/Book_3.PNG",
        productPrice: 98000,
        category: "Books",
        description:
          "Mel Robbins and Sawyer Robbins introduce a powerful mindset shift in this motivating guide that teaches readers how to stop controlling others and focus on inner peace.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Call Me By Name",
        productImage: "/product/Book_4.JPG",
        productPrice: 125000,
        category: "Books",
        description:
          "André Aciman's poignant novel of first love, desire, and self-discovery set against the sun-drenched Italian Riviera, now a major motion picture.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Being In Love",
        productImage: "/product/Book_5.JPG",
        productPrice: 102000,
        category: "Books",
        description:
          "Osho explores how to love with awareness and relate without fear in this spiritual guide to transforming relationships and deepening human connection.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "You Are What Love",
        productImage: "/product/Book_5.JPG",
        productPrice: 99000,
        category: "Books",
        description:
          "James K. A. Smith argues that spiritual transformation comes through reordering our loves and habits in this profound exploration of faith and desire.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Love Life & Work",
        productImage: "/product/Book_7.JPG",
        productPrice: 87000,
        category: "Books",
        description:
          "Elbert Hubbard's timeless collection of essays offering good-natured insights on achieving happiness through love, meaningful work, and thoughtful living.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "The Art of War",
        productImage: "/product/Book_8.JPG",
        productPrice: 76000,
        category: "Books",
        description:
          "Sun Tzu's ancient Chinese military treatise remains a powerful manual on strategy, leadership, and decision-making applicable far beyond the battlefield.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Pride Prejudice",
        productImage: "/product/Book_9.JPG",
        productPrice: 88000,
        category: "Books",
        description:
          "Jane Austen's beloved classic romance follows the spirited Elizabeth Bennet as she navigates social expectations, love, and family in Regency-era England.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Build Life You Want",
        productImage: "/product/Book_10.JPG",
        productPrice: 112000,
        category: "Books",
        description:
          "A transformative guide by Arthur C. Brooks and Oprah Winfrey that blends scientific research with practical wisdom to help readers build lasting happiness and fulfillment in their lives.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Build Life Alt Cover",
        productImage: "/product/Book_11.WEBP",
        productPrice: 112000,
        category: "Books",
        description:
          "An alternate cover edition of the #1 New York Times bestseller by Arthur C. Brooks and Oprah Winfrey exploring the art and science of getting happier.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "My Morning Routine",
        productImage: "/product/Book_12.WEBP",
        productPrice: 97000,
        category: "Books",
        description:
          "Benjamin Spall and Michael Xander profile the daily habits of successful people, showing how simple routines can lead to a more productive and inspired life.",
        stockQuantity: 100,
      },
      // Electronic
      {
        postedBy: vendor._id,
        productName: "LumiGlow Enhancer",
        productImage: "/product/Electronic_1.WEBP",
        productPrice: 300000,
        category: "Electronics",
        description:
          "Revitalize your skincare routine with the LumiGlow Pro Skin Enhancer, a state-of-the-art facial device designed to deliver salon-quality treatments from the comfort of your home",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Ionic Face Massager",
        productImage: "/product/Electronic_2.JPG",
        productPrice: 489000,
        category: "Electronics",
        description:
          "A high-frequency ionic facial massager that helps lift, tighten, and rejuvenate the skin for a youthful glow.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Dyson V11 Vacuum",
        productImage: "/product/Electronic_3.JPG",
        productPrice: 10900000,
        category: "Electronics",
        description:
          "Powerful cordless vacuum cleaner with intelligent sensors, dynamic LCD display, and advanced whole-machine filtration.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Dyson Airwrap Set",
        productImage: "/product/Electronic_4.WEBP",
        productPrice: 14300000,
        category: "Electronics",
        description:
          "Versatile hair styling tool with multiple attachments for curling, smoothing, and volumizing, powered by the Coanda effect technology.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Ceramic Straightener",
        productImage: "/product/Electronic_5.JPG",
        productPrice: 789000,
        category: "Electronics",
        description:
          "Advanced ceramic hair straightener with adjustable heat settings and an LED display for smooth, frizz-free styling.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Ionic Hair Dryer",
        productImage: "/product/Electronic_6.JPG",
        productPrice: 1150000,
        category: "Electronics",
        description:
          "This high-speed hair dryer features ionic technology and a sleek futuristic design to reduce frizz and dry hair efficiently.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "LG PuriCare Purifier",
        productImage: "/product/Electronic_7.JPG",
        productPrice: 4890000,
        category: "Electronics",
        description:
          "The LG PuriCare delivers powerful filtration with a 360° design, eliminating dust and allergens to keep your air fresh and clean.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "PlayStation VR2",
        productImage: "/product/Electronic_8.JPG",
        productPrice: 15990000,
        category: "Electronics",
        description:
          "Immerse yourself in next-gen gaming with the PlayStation VR2 headset, featuring stunning 4K HDR visuals, advanced tracking, and haptic feedback.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "PlayStation VR2 Set",
        productImage: "/product/Electronic_9.WEBP",
        productPrice: 17990000,
        category: "Electronics",
        description:
          "Complete PlayStation VR2 package including headset, controllers, earbuds, and accessories for the ultimate immersive gaming experience.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "PS VR2 Headset Ctrl",
        productImage: "/product/Electronic_10.WEBP",
        productPrice: 16990000,
        category: "Electronics",
        description:
          "Experience next-gen virtual reality with the PlayStation VR2 headset and Sense controllers. Ergonomic design and immersive gameplay tailored for PlayStation 5.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Kindle Paperwhite",
        productImage: "/product/Electronic_11.WEBP",
        productPrice: 3290000,
        category: "Electronics",
        description:
          "Enjoy glare-free reading with the Kindle Paperwhite's 6.8-inch display, adjustable warm light, and waterproof design—perfect for book lovers on the go.",
        stockQuantity: 100,
      },
      {
        postedBy: vendor._id,
        productName: "Fujifilm X100V Cam",
        productImage: "/product/Electronic_12.JPG",
        productPrice: 31490000,
        category: "Electronics",
        description:
          "Capture stunning street and travel photos with the Fujifilm X100V, featuring a 23mm f/2 lens, hybrid viewfinder, and retro design packed with modern power.",
        stockQuantity: 100,
      },
    ];

    // Save documents to collection
    await Product.insertMany(products);
    console.log("Product Data Seeded");
  })
  .catch((error) => {
    console.error("Error seeding product data:", error);
  });

await Order.deleteMany({});
console.log("Order Data Cleared");

// End script
process.exit(0);
