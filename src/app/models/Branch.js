const db = require("../../config/db");
const Branch = {};

// DISPLAY ALL BRANCHES
Branch.getAll = () => {
    return db.query(`SELECT * FROM branch ORDER BY id DESC`);
};

// GET ONE BRANCH
Branch.getOne = (id) => {
    return db.query(`SELECT * FROM branch WHERE id = $1`, [id]);
};

// CREATE BRANCH
Branch.create = (name, phone, address) => {
    return db.query(`INSERT INTO branch (name, phone, address) VALUES($1, $2, $3) RETURNING *`, [name, phone, address]);
};

// UPDATE BRANCH
Branch.update = (id, name, phone, address) => {
    return db.query(`UPDATE branch SET name = $1, phone = $2, address = $3 WHERE id = $4 RETURNING *`, [name, phone, address, id]);
};

// DELETE BRANCH
Branch.delete = (id) => {
    return db.query(`DELETE FROM branch WHERE id = $1`, [id]);
};

// SEARCH BRANCH
Branch.search = (name) => {
    return db.query(`SELECT * FROM branch WHERE name ILIKE $1`, [`%${name}%`]);
};

module.exports = { Branch };