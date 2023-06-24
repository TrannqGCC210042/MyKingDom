const db = require("../../config/db");
const Order = {};

// DISPLAY ALL ORDERS
Order.getAll = () => {
    return db.query(`SELECT * FROM orders ORDER BY delivery_date DESC`);
};

// CONFIRM ORDER
Order.confirm = (id) => {
    return db.query(`UPDATE orders SET delivery_date = CURRENT_TIMESTAMP, status = true WHERE id = $1`, [id]);
};

// SAVE ORDER
Order.save = (delivery_local, cust_name, cust_phone, total, username) => {
    return db.query(`INSERT INTO orders(
	order_date, delivery_date, delivery_local, cust_name, cust_phone, total, status, username)
	VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $1, $2, $3, $4, $5, $6) RETURNING *`, [delivery_local, cust_name, cust_phone, total, false, username]);
};

// GET ORDER NEAREST
Order.getNearestOrder = () => {
    return db.query(`SELECT * FROM orders WHERE status = false ORDER BY delivery_date DESC LIMIT 1`);
};

// LIST OF ORDER WITH BRANCH, BRAND, CATEGORY, AND PRODUCT
Order.list = () => {
    return db.query(`SELECT o.id, o.customer_id, o.branch_id, o.total_price, o.status, o.delivery_date, b.name AS branch_name, b.address AS branch_address, b.phone AS branch_phone, c.name AS customer_name, c.address AS customer_address, c.phone AS customer_phone FROM orders o INNER JOIN branches b ON o.branch_id = b.id INNER JOIN customers c ON o.customer_id = c.id ORDER BY o.delivery_date DESC`);
};

// UPDATE STATUS OF ORDER
Order.update = (id) => {
    return db.query(`UPDATE orders SET status = $1 WHERE id = $2`, [true, id]);
};

module.exports = { Order };