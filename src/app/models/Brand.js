const db = require("../../config/db");
const Brand = {};

// GET ALL BRANDS
Brand.getAll = () => {
    return db.query(`SELECT * FROM brand ORDER BY id DESC`);
};

// GET ALL BRANDS
Brand.getBrand = () => {
    return db.query(`SELECT * FROM brand LIMIT 6`);
};

// GET ONE BRAND
Brand.getOne = (id) => {
    return db.query(`SELECT * FROM brand WHERE id = $1`, [id]);
};

// CREATE BRAND
Brand.create = (name, image) => {
    return db.query(`INSERT INTO brand (name, image) VALUES($1, $2) RETURNING *`, [name, image]);
};

// UPDATE BRAND
Brand.update = (id, name, image) => {
    return db.query(`UPDATE brand SET name = $1, image = $2 WHERE id = $3 RETURNING *`, [name, image, id]);
};

// DELETE BRAND
Brand.delete = (id) => {
    return db.query(`DELETE FROM brand WHERE id = $1`, [id]);
};

// SEARCH BRAND
Brand.search = (name) => {
    return db.query(`SELECT * FROM brand WHERE name ILIKE $1`, [`%${name}%`]);
};

module.exports = { Brand }; 