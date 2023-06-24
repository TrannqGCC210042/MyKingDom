const db = require("../../config/db");
const Cart = {};

// COUNT PRODUCT AND TOTAL PRICE
Cart.countProduct = (username) => {
    return db.query(`SELECT COUNT(*) as items, (CAST(SUM((p.price * c.count)) as decimal(10, 2)) + 5) as total_price, CAST(SUM(p.price * c.count) as decimal(10, 2)) as Subtotal
    FROM cart as c
    INNER JOIN product as p ON c.pid = p.id
    WHERE c.username = $1`, [username]);
};

// GET CART ID
Cart.getCartId = (username) => {
    return db.query(`SELECT id FROM cart WHERE username = $1`, [username]);
};

// GET PRODUCT, QUANTITY AND UNIT PRICE IN CART
Cart.getProduct = (username) => {
    return db.query(`SELECT p.id as proId, c.count as quantity, CAST(p.price * c.count as decimal(10, 2)) as unit_price
    FROM cart as c
    INNER JOIN product as p ON c.pid = p.id
    WHERE c.username = $1`, [username]);
};

// GET TOTAL PRICE, QUANTITY AND PRODUCT ID IN CART
Cart.getTotalPrice = (username) => {
    return db.query(`SELECT SUM(p.price * c.count) as total_price, c.count, c.pid
    FROM cart as c
    INNER JOIN product as p ON c.pid = p.id
    WHERE c.username = $1
    GROUP BY c.count, c.pid`, [username]);
};


// GET CART BY USER ID AND DISPLAY PRODUCTS OF THIS PRODUCT
Cart.getCartByUserId = (username) => {
    return db.query(`SELECT c.id as id, c.username, c.pid, c.count, p.name, p.price, p.image, b.name as brand, CAST(p.price * c.count as decimal(10, 2)) as unit_price
	FROM cart as c 
    INNER JOIN product as p ON c.pid = p.id 
    INNER JOIN brand as b ON b.id = p.brand_id 
    WHERE c.username = $1`, [username]);
};

// UPDATE CART
Cart.updateCart = (cart_id, quantity) => {
    return db.query(`UPDATE cart SET count = $1 WHERE id = $2 RETURNING *`, [quantity, cart_id]);
};

// GET CART BY ID
Cart.getCartById = (cart_id) => {
    return db.query(`SELECT c.*, p.price
    FROM cart as c 
    INNER JOIN product as p ON c.pid = p.id 
    WHERE c.id = $1`, [cart_id]);
};

// CHECK PRODUCT IN CART
Cart.isProductInCart = (username, product_id) => {
    return db.query(`SELECT * FROM cart WHERE username = $1 AND pid = $2`, [username, product_id]);
};

// DELETE CART
Cart.deleteCart = (id) => {
    return db.query(`DELETE FROM cart WHERE id = $1`, [id]);
};

// SAVE CART
Cart.save = (username, product_id, quantity) => {   
    return db.query(`INSERT INTO cart (username, pid, count) VALUES ($1, $2, $3) RETURNING *`, [username, product_id, quantity]);
};


module.exports = { Cart };