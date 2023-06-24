const db = require("../../config/db");
const OrderDetail = {};

// DISPLAY ALL ORDER DETAILS BY ORDER ID
OrderDetail.getAll = (id) => {
    return db.query(`SELECT od.order_id, od.quantity, p.name, p.image, p.price, (p.price * od.quantity) as total FROM orderdetail od JOIN product p ON od.pro_id = p.id WHERE order_id = $1`, [id]);
};

// SAVE ORDER DETAIL
OrderDetail.save = (order_id, pro_id, quantity, unit_price) => {
    return db.query(`INSERT INTO public.orderdetail(
	order_id, pro_id, quantity, "unitPrice")
	VALUES ($1, $2, $3, $4)`, [order_id, pro_id, quantity, unit_price]);
};

module.exports = { OrderDetail };