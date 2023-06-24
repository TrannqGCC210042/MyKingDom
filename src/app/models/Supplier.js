const db = require("../../config/db");
const Supplier = {};

// DISPLAY ALL SUPPLIERS
Supplier.getAll = () => {
    return db.query(`SELECT * FROM supplier ORDER BY id DESC`);
};

// GET ONE SUPPLIER
Supplier.getOne = (id) => {
    return db.query(`SELECT * FROM supplier WHERE id = $1`, [id]);
};

// CREATE SUPPLIER
Supplier.create = (name, phone, address, email) => {
    return db.query(`INSERT INTO supplier (name, phone, address, email) VALUES($1, $2, $3, $4) RETURNING *`, [name, phone, address, email]);
};

// UPDATE SUPPLIER
Supplier.update = (id, name, phone, address, email) => {
    return db.query(`UPDATE supplier SET name = $1, phone = $2, address = $3, email = $4 WHERE id = $5 RETURNING *`, [name, phone, address, email, id]);
};

// DELETE SUPPLIER
Supplier.delete = (id) => {
    return db.query(`DELETE FROM supplier WHERE id = $1`, [id]);
};

// SEARCH SUPPLIER
Supplier.search = (name) => {
    return db.query(`SELECT * FROM supplier WHERE name ILIKE $1`, [`%${name}%`]);
};

module.exports = { Supplier };