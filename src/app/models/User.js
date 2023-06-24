const db = require("../../config/db");
const User = {};
// CREATE USER
User.create = (
  username,
  password,
  first_name,
  last_name,
  gender,
  birthday,
  email,
  telephone,
  address,
  role,
  facebook_id
) => {
  return db.query(
    `INSERT INTO users (username, password, first_name, last_name, gender, birthday, email, telephone, address, role, facebook_id) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
    [
      username,
      password,
      first_name,
      last_name,
      gender,
      birthday,
      email,
      telephone,
      address,
      role,
      facebook_id
    ]
  );
};

// EMAIL EXIST
User.getOneEmail = (email) => {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

User.getOne = (username) => {
  return db.query(
    `SELECT u.*, TO_CHAR(u.birthday, 'MM/DD/YYYY') as dayOfBirth FROM users u WHERE username = $1`,
    [username]
  );
};

// UPDATE USER
User.update = (
  first_name,
  last_name,
  birthday,
  gender,
  telephone,
  address,
  username
) => {
  return db.query(
    `UPDATE users
	SET first_name=$1, last_name=$2, birthday=$3, gender=$4, telephone=$5, address=$6
	WHERE username = $7`,
    [first_name, last_name, birthday, gender, telephone, address, username]
  );
};

// HISTORY
User.getHistory = (username, status) => {
  return db.query(
    `SELECT o.id as order_id, p.name, p.price, p.image, 
    s.name as supplier, b.name as brand, "unitPrice" as unitprice
    FROM orders o
    INNER JOIN users u ON o.username = u.username
    INNER JOIN orderdetail od ON o.id = od.order_id
    INNER JOIN product p ON od.pro_id = p.id
    INNER JOIN supplier s ON s.id = p.supplier_id
    INNER JOIN brand b ON b.id = p.brand_id
    WHERE u.username = $1 AND o.status = $2
    ORDER BY order_id ASC`,
    [username, status]
  );
};

// GET ORDER ID
User.getOrderId = (username, status) => {
  return db.query(
    `SELECT o.id, TO_CHAR(o.order_date, 'MM/DD/YYYY') as order_date, o.cust_phone,
  (o.total - 5) as subtotal, o.total
    FROM orders o
    INNER JOIN users u ON o.username = u.username
    INNER JOIN orderdetail od ON o.id = od.order_id
    INNER JOIN product p ON od.pro_id = p.id
    INNER JOIN supplier s ON s.id = p.supplier_id
    INNER JOIN brand b ON b.id = p.brand_id
    WHERE u.username = $1 AND o.status = $2
    GROUP BY o.id, order_date
    ORDER BY id ASC`,
    [username, status]
  );
};

// GET USER BY EMAIL
User.getUserByEmail = (email) => {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

// CHECK USER EXIST
User.checkUserExist = (username) => {
  return db.query(`SELECT * FROM users WHERE username = $1`, [username]);
};

// GET USER BY FACEBOOK ID
User.getUserByFacebookId = (facebookId) => {
  return db.query(`SELECT * FROM users WHERE facebook_id = $1`, [facebookId]);
};

// CHECK OLD PASSWORD
User.checkOldPassword = (username, password) => {
  return db.query(
    `SELECT * FROM users WHERE username = $1 AND password = $2`,
    [username, password]
  );
};

// UPDATE PASSWORD
User.updatePassword = (username, password) => {
  return db.query(
    `UPDATE users
    SET password = $1
    WHERE username = $2`,
    [password, username]
  );
};

// UPDATE USERNAME AND PASSWORD
User.updateGoogle = (username, password, email) => {
  return db.query(
    `UPDATE users 
    SET username = $1, password = $2
    WHERE email = $3`,
    [username, password, email]
  );
};

// CHECK PHONE EXIST
User.getOnePhone = (telephone) => {
  return db.query(`SELECT * FROM users WHERE telephone = $1`, [telephone]);
};

// CHECK DUPLICATE PHONE
User.checkDuplicatePhone = (telephone, username) => {
  return db.query(
    `SELECT * FROM users WHERE telephone = $1 AND username != $2`,
    [telephone, username]
  );
};

module.exports = { User };
