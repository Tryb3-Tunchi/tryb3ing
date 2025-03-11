// import { Product } from "../hooks/data-types";

// export type LinkType = string;

// export const links: LinkType[] = [
//   "Fragrances",
//   "New Arrivals",
//   "Clothing",
//   "Footwear",
//   "Accessories",
// ];

// export const sublistContent: { [key in LinkType]?: string[] } = {
//   Footwear: ["Sneakers & Trainers", "Flip Flops & Sliders", "Shoes & Sandals"],
//   Accessories: [
//     "Sunglasses",
//     "Hats & Caps",
//     "Socks, Wallets & Belts",
//     "Gloves & Scarves",
//     "Watches",
//   ],
//   Clothing: [
//     "T-Shirts",
//     "Tops",
//     "Polo Shirts",
//     "Sweatshirts",
//     "Hoodies",
//     "Jackets",
//     "Jumpers",
//     "Shorts",
//     "Jeans & Trousers",
//     "Underwear",
//     "Swim Shorts",
//   ],
// };

// export const footerSections = [
//   {
//     header: "Customer Service",
//     links: ["Contact Us", "FAQs", "Order and Delivery", "Payment"],
//   },
//   {
//     header: "About",
//     links: ["About Us", "Careers", "Partner Boutiques", "Promotions"],
//   },
//   {
//     header: "Services",
//     links: ["Shipping Policy", "Privacy Policy", "Affiliates", "Cookie Policy"],
//   },
// ];

// export const Products: Product[] = [
//   { id: 1, name: "Men's Slim Fit T-Shirt", category: "Clothing", price: 19.99, image: "https://example.com/images/mens-slim-fit-tshirt.jpg" },
//   { id: 2, name: "Women's Maxi Dress", category: "Clothing", price: 34.99, image: "https://example.com/images/womens-maxi-dress.jpg" },
//   { id: 3, name: "Men's Denim Jacket", category: "Clothing", price: 59.99, image: "https://example.com/images/mens-denim-jacket.jpg" },
//   { id: 4, name: "Women's Leather Jacket", category: "Clothing", price: 89.99, image: "https://example.com/images/womens-leather-jacket.jpg" },
//   { id: 5, name: "Men's Chino Pants", category: "Clothing", price: 39.99, image: "https://example.com/images/mens-chino-pants.jpg" },
//   { id: 6, name: "Women's Skinny Jeans", category: "Clothing", price: 49.99, image: "https://example.com/images/womens-skinny-jeans.jpg" },
//   { id: 7, name: "Men's Running Shoes", category: "Footwear", price: 69.99, image: "https://example.com/images/mens-running-shoes.jpg" },
//   { id: 8, name: "Women's Sneakers", category: "Footwear", price: 59.99, image: "https://example.com/images/womens-sneakers.jpg" },
//   { id: 9, name: "Men's Leather Loafers", category: "Footwear", price: 79.99, image: "https://example.com/images/mens-leather-loafers.jpg" },
//   { id: 10, name: "Women's High Heels", category: "Footwear", price: 49.99, image: "https://example.com/images/womens-high-heels.jpg" },
//   { id: 11, name: "Men's Chelsea Boots", category: "Footwear", price: 99.99, image: "https://example.com/images/mens-chelsea-boots.jpg" },
//   { id: 12, name: "Women's Ankle Boots", category: "Footwear", price: 89.99, image: "https://example.com/images/womens-ankle-boots.jpg" },
//   { id: 13, name: "Unisex Flip-Flops", category: "Footwear", price: 14.99, image: "https://example.com/images/unisex-flip-flops.jpg" },
//   { id: 14, name: "Men's Aviator Sunglasses", category: "Accessories", price: 29.99, image: "https://example.com/images/mens-aviator-sunglasses.jpg" },
//   { id: 15, name: "Women's Oversized Sunglasses", category: "Accessories", price: 34.99, image: "https://example.com/images/womens-oversized-sunglasses.jpg" },
//   { id: 16, name: "Men's Leather Wallet", category: "Accessories", price: 24.99, image: "https://example.com/images/mens-leather-wallet.jpg" },
//   { id: 17, name: "Women's Crossbody Bag", category: "Accessories", price: 49.99, image: "https://example.com/images/womens-crossbody-bag.jpg" },
//   { id: 18, name: "Men's Classic Watch", category: "Accessories", price: 149.99, image: "https://example.com/images/mens-classic-watch.jpg" },
//   { id: 19, name: "Women's Bracelet Watch", category: "Accessories", price: 129.99, image: "https://example.com/images/womens-bracelet-watch.jpg" },
//   { id: 20, name: "Men's Formal Tie", category: "Accessories", price: 19.99, image: "https://example.com/images/mens-formal-tie.jpg" },
//   { id: 21, name: "Women's Silk Scarf", category: "Accessories", price: 24.99, image: "https://example.com/images/womens-silk-scarf.jpg" },
//   { id: 22, name: "Men's Cologne - Fresh Scent", category: "Fragrances", price: 49.99, image: "https://example.com/images/mens-cologne-fresh.jpg" },
//   { id: 23, name: "Women's Perfume - Floral Notes", category: "Fragrances", price: 59.99, image: "https://example.com/images/womens-perfume-floral.jpg" },
//   { id: 24, name: "Men's Cologne - Woody Scent", category: "Fragrances", price: 54.99, image: "https://example.com/images/mens-cologne-woody.jpg" },
//   { id: 25, name: "Women's Perfume - Citrus Blend", category: "Fragrances", price: 44.99, image: "https://example.com/images/womens-perfume-citrus.jpg" },
//   { id: 26, name: "Men's Hooded Sweatshirt", category: "Clothing", price: 39.99, image: "https://example.com/images/mens-hooded-sweatshirt.jpg" },
//   { id: 27, name: "Women's Cardigan Sweater", category: "Clothing", price: 49.99, image: "https://example.com/images/womens-cardigan-sweater.jpg" },
//   { id: 28, name: "Men's Graphic Tee", category: "Clothing", price: 24.99, image: "https://example.com/images/mens-graphic-tee.jpg" },
//   { id: 29, name: "Women's Tank Top", category: "Clothing", price: 19.99, image: "https://example.com/images/womens-tank-top.jpg" },
//   { id: 30, name: "Men's Leather Belt", category: "Accessories", price: 29.99, image: "https://example.com/images/mens-leather-belt.jpg" },
//   { id: 31, name: "Women's Hair Clips", category: "Accessories", price: 9.99, image: "https://example.com/images/womens-hair-clips.jpg" },
//   { id: 32, name: "Men's Baseball Cap", category: "Accessories", price: 19.99, image: "https://example.com/images/mens-baseball-cap.jpg" },
//   { id: 33, name: "Women's Fedora Hat", category: "Accessories", price: 39.99, image: "https://example.com/images/womens-fedora-hat.jpg" },
//   { id: 34, name: "Men's Training Shoes", category: "Footwear", price: 79.99, image: "https://example.com/images/mens-training-shoes.jpg" },
//   { id: 35, name: "Women's Ballet Flats", category: "Footwear", price: 44.99, image: "https://example.com/images/womens-ballet-flats.jpg" },
//   { id: 36, name: "Unisex Waterproof Boots", category: "Footwear", price: 99.99, image: "https://example.com/images/unisex-waterproof-boots.jpg" },
//   { id: 37, name: "Men's Polo Shirt", category: "Clothing", price: 29.99, image: "https://example.com/images/mens-polo-shirt.jpg" },
//   { id: 38, name: "Women's Evening Gown", category: "Clothing", price: 89.99, image: "https://example.com/images/womens-evening-gown.jpg" },
//   { id: 39, name: "Men's Wool Sweater", category: "Clothing", price: 59.99, image: "https://example.com/images/mens-wool-sweater.jpg" },
//   { id: 40, name: "Women's Denim Shorts", category: "Clothing", price: 34.99, image: "https://example.com/images/womens-denim-shorts.jpg" },
// ];
