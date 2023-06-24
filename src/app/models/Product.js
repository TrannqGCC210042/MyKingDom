const db = require("../../config/db");
const Product = {};

// GET ALL PRODUCTS MATCH WITH SEARCH
Product.search = (search) => {
  return db.query(`SELECT * FROM product WHERE UPPER(name) LIKE '%${search}%'`);
};

// GET 6 THE BEST DICOUNT PRODUCTS IN HOME PAGE
Product.displayProductDiscountOnHomePage = () => {
  return db.query(
    `SELECT * FROM product ORDER BY old_price < price AND old_price > 0 DESC LIMIT 6`
  );
};

// GET THREE HIGHEST SELLING PRODUCTS IN THE STORE OF THE MONTH
Product.displayProductBestSellerOnHomePage = () => {
  return db.query(`SELECT p.id, p.name, p.image, p.price, short_description, SUM(od.quantity) AS total_sold
  FROM public.product p
  JOIN public.orderdetail od ON p.id = od.pro_id
  GROUP BY p.id, p.name
  ORDER BY total_sold DESC LIMIT 3;`);
};

// GET ALL PRODUCTS DISPLAY ON SHOP PAGE
Product.displayAllProductsOnShopPage = () => {
  return db.query(`SELECT * FROM product`);
};

// UPDATE QUANTITY OF PRODUCT
Product.updateQuantity = (quantity, id) => {
  return db.query(`UPDATE product SET quantity = $1 WHERE id = $2`, [
    quantity,
    id,
  ]);
};

// GET ALL PRODUCTS BY PRICE IN SHOP PAGE
Product.displayProductByPriceOnShopPage = (price) => {
  return db.query(`SELECT * FROM product WHERE price < $1`, [price]);
};

// GET ALL PRODUCTS, BRAND NAME BY BRANCH IN SHOP PAGE
Product.displayProductByBrandOnShopPage = (brandId) => {
  return db.query(
    `SELECT p.*, b.name AS brand_name FROM product p JOIN brand b ON p.brand_id = b.id WHERE brand_id = $1`,
    [brandId]
  );
};

// GET ALL PRODUCTS, SUPPLIER NAME BY SUPPLIER IN SHOP PAGE
Product.displayProductBySupplierOnShopPage = (supplierId) => {
  return db.query(
    `SELECT p.*, s.name AS supplier_name FROM product p JOIN supplier s ON p.supplier_id = s.id WHERE supplier_id = $1`,
    [supplierId]
  );
};

// GET ALL PRODUCTS BY PRICE ASCENDING IN SHOP PAGE
Product.displayProductByPriceAscendingOnShopPage = () => {
  return db.query(`SELECT * FROM product ORDER BY price ASC`);
};

// GET ALL PRODUCTS BY PRICE DESCENDING IN SHOP PAGE
Product.displayProductByPriceDescendingOnShopPage = () => {
  return db.query(`SELECT * FROM product ORDER BY price DESC`);
};

// GET ALL PRODUCTS BY GENDER IN SHOP PAGE
Product.displayProductByGenderOnShopPage = (gender) => {
  return db.query(`SELECT * FROM product WHERE for_gender = $1`, [gender]);
};

// GET ALL PRODUCTS BY NAME A to Z IN SHOP PAGE
Product.displayProductByNameAToZOnShopPage = () => {
  return db.query(`SELECT * FROM product ORDER BY name ASC`);
};

// GET ALL PRODUCTS BY NAME Z to A IN SHOP PAGE
Product.displayProductByNameZToAOnShopPage = () => {
  return db.query(`SELECT * FROM product ORDER BY name DESC`);
};

// GITHUB COPILOT

// GET SUGGEST PRODUCT ON DETAIL PAGE
Product.displayProductSuggestDetailPage = (
  supplier_id,
  branch_id,
  brand_id,
  product_id
) => {
  return db.query(
    `SELECT p.* FROM product p
                  JOIN brand bd ON p.brand_id = bd.id
                  JOIN branch bch ON p.branch_id = bch.id
                  JOIN supplier s ON p.supplier_id = s.id
                  WHERE (s.id = $1 OR bch.id = $2 OR bd.id = $3) AND p.id != $4 LIMIT 3`,
    [supplier_id, branch_id, brand_id, product_id]
  );
};

// GET ONE PRODUCT DISPLAY ON DETAIL PAGE
Product.displayProductOnDetailPage = (id) => {
  return db.query(
    `SELECT p.*, s.name as supplier, bch.name as branch, bd.name as brand FROM product p
                  JOIN brand bd ON p.brand_id = bd.id
                  JOIN branch bch ON p.branch_id = bch.id
                  JOIN supplier s ON p.supplier_id = s.id
                  WHERE p.id = $1`,
    [id]
  );
};

// GET ALL PRODUCTS DISPLAY ON SHOP PAGE
Product.getAll = () => {
  return db.query(`SELECT p.*, bd.name as brand_name, bch.name as branch_name, s.name as supplier_name 
                  FROM product p JOIN brand bd ON p.brand_id = bd.id 
                  JOIN branch bch ON p.branch_id = bch.id 
                  JOIN supplier s ON p.supplier_id = s.id 
                  ORDER BY updated_at DESC`);
};

// GET ONE PRODUCT
Product.getOne = (id) => {
  return db.query(
    `SELECT p.*, bd.name as brand_name, bch.name as branch_name, s.name as supplier_name 
                  FROM product p JOIN brand bd ON p.brand_id = bd.id 
                  JOIN branch bch ON p.branch_id = bch.id 
                  JOIN supplier s ON p.supplier_id = s.id 
                  WHERE p.id = $1`,
    [id]
  );
};

// CREATE A NEW PRODUCT
Product.create = (
  name,
  shortDescription,
  description,
  price,
  forGender,
  quantity,
  image,
  brandId,
  branchId,
  supplierId,
  old_price
) => {
  return db.query(
    `INSERT INTO product(
      name, status, short_description, detail_description, price, for_gender, quantity, image, created_at, updated_at, brand_id, branch_id, supplier_id, old_price)
        VALUES ($1, true, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $8, $9, $10, $11) RETURNING *`,
    [
      name,
      shortDescription,
      description,
      price,
      forGender,
      quantity,
      image,
      brandId,
      branchId,
      supplierId,
      old_price,
    ]
  );
};

// UPDATE A PRODUCT
Product.update = (
  id,
  name,
  status,
  shortDescription,
  description,
  price,
  forGender,
  quantity,
  image,
  brandId,
  branchId,
  supplierId,
  old_price
) => {
  return db.query(
    `UPDATE public.product SET name=$1, status=$2, short_description=$3, detail_description=$4, price=$5, for_gender=$6, quantity=$7, image=$8, updated_at=CURRENT_TIMESTAMP, brand_id=$9, branch_id=$10, supplier_id=$11, old_price=$12
    WHERE id=$13 RETURNING *`,
    [
      name,
      status,
      shortDescription,
      description,
      price,
      forGender,
      quantity,
      image,
      brandId,
      branchId,
      supplierId,
      old_price,
      id,
    ]
  );
};

// DELETE A PRODUCT
Product.delete = (id) => {
  return db.query(`DELETE FROM public.product WHERE id=$1`, [id]);
};

// BEST SELLER WITH QUANTITY SALE
Product.getBestSeller = () => {
  return db.query(`SELECT p.id, p.name, p.image, SUM(od.quantity) as quantity_sale, CAST(SUM(p.price * od.quantity) as decimal(10, 2)) as revenue, EXTRACT(MONTH FROM delivery_date) as month
  FROM orderdetail od 
  JOIN orders o ON o.id = od.order_id
  JOIN product p ON p.id = od.pro_id
  WHERE p.id IN (SELECT pro_id FROM orderdetail GROUP BY pro_id)
  GROUP BY p.id, EXTRACT(MONTH FROM delivery_date)
  ORDER BY revenue DESC LIMIT 4 
`);
};

// BEST SELLER BY BRAND
Product.getBestSellerByBrand = () => {
  return db.query(`SELECT bd.name, bd.image, SUM(od.quantity) as quantity_sale, CAST(SUM(p.price * od.quantity) as decimal(10, 2)) as revenue, EXTRACT(MONTH FROM delivery_date) as month
  FROM orderdetail od 
  JOIN orders o ON o.id = od.order_id
  JOIN product p ON p.id = od.pro_id
  JOIN brand bd ON p.brand_id = bd.id
  WHERE p.id IN (SELECT pro_id FROM orderdetail GROUP BY pro_id)
  GROUP BY bd.id, EXTRACT(MONTH FROM delivery_date)
  ORDER BY revenue DESC LIMIT 6
  `);
};

// REVENUE BY MONTH OF EACH BRANCH
Product.getRevenueByMonthOfEachBranch = () => {
  return db.query(`SELECT bch.name as branch_name,SUM(od.quantity) as quantity_sale, SUM(od.quantity * p.price) as revenue, TO_CHAR(o.delivery_date, 'Month') AS month
  FROM orderdetail od JOIN product p ON od.pro_id = p.id
  JOIN orders o ON o.id = od.order_id
  JOIN branch bch ON p.branch_id = bch.id 
  GROUP BY bch.name, month
  ORDER BY revenue DESC`);
};

module.exports = { Product };

// INSERT INTO public.branch(name, phone, address)
// VALUES
//     ('Toy World', '1234567890', '123 Main Street'),
//     ('Kids Toys', '2345678901', '456 Elm Avenue'),
//     ('Fun Toys', '3456789012', '789 Oak Road'),
//     ('Playful Pals', '4567890123', '987 Maple Lane'),
//     ('Happy Toys', '5678901234', '321 Pine Street'),
//     ('Toyland', '6789012345', '654 Cedar Avenue'),
//     ('Imagination Station', '7890123456', '876 Oak Street'),
//     ('Toy Express', '8901234567', '543 Elm Road'),
//     ('Adventure Toys', '9012345678', '210 Maple Avenue'),
//     ('Toy Kingdom', '0123456789', '789 Pine Road');

// INSERT INTO public.brand(name, image)
// VALUES
//     ('Brand A', 'brand_a.jpg'),
//     ('Brand B', 'brand_b.jpg'),
//     ('Brand C', 'brand_c.jpg'),
//     ('Brand D', 'brand_d.jpg'),
//     ('Brand E', 'brand_e.jpg'),
//     ('Brand F', 'brand_f.jpg'),
//     ('Brand G', 'brand_g.jpg'),
//     ('Brand H', 'brand_h.jpg'),
//     ('Brand I', 'brand_i.jpg'),
//     ('Brand J', 'brand_j.jpg');

// INSERT INTO public.supplier(
// 	id, name, phone, address, email)
// VALUES
//     ('Supplier A', '0123456789', '123 Main Street', 'supplierA@example.com'),
//     ('Supplier B', '0234567890', '456 Elm Avenue', 'supplierB@example.com'),
//     ('Supplier C', '0345678901', '789 Oak Road', 'supplierC@example.com'),
//     ('Supplier D', '0456789012', '987 Maple Lane', 'supplierD@example.com'),
//     ('Supplier E', '0567890123', '321 Pine Street', 'supplierE@example.com'),
//     ('Supplier F', '0678901234', '654 Cedar Avenue', 'supplierF@example.com'),
//     ('Supplier G', '0789012345', '876 Oak Street', 'supplierG@example.com'),
//     ('Supplier H', '0890123456', '543 Elm Road', 'supplierH@example.com'),
//     ('Supplier I', '0901234567', '210 Maple Avenue', 'supplierI@example.com'),
//     ('Supplier J', '0012345678', '789 Pine Road', 'supplierJ@example.com');

// INSERT INTO public.product(
//     id, name, status, short_description, detail_description, price, for_gender, quantity, image, created_at, updated_at, brand_id, branch_id, supplier_id)
// VALUES
//     (1, 'RC Car', true, 'High-speed remote control car', 'This RC car is designed for teenagers who love speed and excitement. It comes with advanced features and excellent maneuverability.', 49.99, true, 50, 'rc_car.jpg', NOW(), NOW(), 1, 1, 1),
//     (2, 'Puzzle Set', true, 'Challenging puzzle set for brain exercise', 'This puzzle set includes various brain teasers and challenging puzzles that are perfect for teenagers who enjoy solving complex problems.', 19.99, true, 20, 'puzzle_set.jpg', NOW(), NOW(), 2, 1, 1),
//     (3, 'Board Game', true, 'Strategy-based board game', 'This board game offers strategic gameplay and is designed to entertain and engage teenagers for hours. Gather your friends and enjoy some quality time!', 29.99, true, 30, 'board_game.jpg', NOW(), NOW(), 3, 2, 2),
//     (4, 'Building Blocks', true, 'Creative building blocks set', 'Unleash your creativity with this building blocks set. It includes a variety of colorful blocks and allows teenagers to construct their own imaginative creations.', 14.99, true, 100, 'building_blocks.jpg', NOW(), NOW(), 4, 2, 2),
//     (5, 'Virtual Reality Headset', true, 'Immersive virtual reality experience', 'Experience virtual reality like never before with this high-quality VR headset. It offers a wide range of compatible games and applications for an immersive entertainment experience.', 79.99, true, 10, 'vr_headset.jpg', NOW(), NOW(), 5, 3, 3),
//     (6, 'Action Figure Set', true, 'Collection of action figures', 'This action figure set features popular characters and allows teenagers to create epic battles and stories. Perfect for imaginative play!', 39.99, true, 15, 'action_figure_set.jpg', NOW(), NOW(), 1, 1, 2),
//     (7, 'Art Set', true, 'Complete art set for creative expression', 'This art set includes various art supplies such as paints, brushes, and canvases, providing teenagers with everything they need to unleash their artistic skills.', 24.99, true, 25, 'art_set.jpg', NOW(), NOW(), 2, 1, 3),
//     (8, 'Sports Equipment Set', true, 'Sports equipment kit for active teens', 'Encourage physical activity with this sports equipment set. It includes items like a basketball, soccer ball, and skipping rope to keep teenagers active and engaged.', 29.99, true, 20, 'sports_equipment_set.jpg', NOW(), NOW(), 3, 2, 4),
//     (9, 'Tech Gadgets Kit', true, 'Assortment of cool tech gadgets', 'This tech gadgets kit includes the latest devices and accessories that teenagers will love. From headphones to smartwatches, it's a must-have for tech enthusiasts!', 69.99, true, 8, 'tech_gadgets_kit.jpg', NOW(), NOW(), 4, 2, 5),
//     (10, 'Fashion Design Kit', true, 'Kit for aspiring fashion designers', 'Unleash your creativity and design your own fashion with this fashion design kit. It includes fabrics, sketchbooks, and tools for teenagers to express their unique style.', 19.99, true, 30, 'fashion_design_kit.jpg', NOW(), NOW(), 5, 3, 6);
