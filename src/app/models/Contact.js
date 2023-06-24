const db = require("../../config/db");
const Contact = {};

// Save contact
Contact.save = (name, email, subject, message) => {
    return db.query(`INSERT INTO contacts (name, email, subject, message, send_date) VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *`, [name, email, subject, message]);
};
 module.exports = { Contact };