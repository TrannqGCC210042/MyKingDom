const { Supplier } = require('../models/Supplier');
class SupplierController {
    // Read all
    async read(req, res) {
        try {
            let suppliers = [];
            if (req.query.search) {
                const name = req.query.search;
                suppliers = await Supplier.search(name)
            } else {
                suppliers = await Supplier.getAll()
            }
            res.render('supplier/index', {
                title: "Supplier",
                script: "supplier.js",
                suppliers: suppliers.rows,
            })
        } catch (error) {
            console.error("Error retrieving suppliers", error);
            res.status(500).json({ error: "Failed to retrieve suppliers" });
        }
    }

    // Read one
    detail(req, res) {
        try {
            Supplier.getOne(req.params.id)
                .then((result) => {
                    return res.status(200).json({ supplier: result.rows[0] });
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({ error: "Failed to retrieve supplier" });
                });
        } catch (error) {
            console.error("Error retrieving supplier", error);
            res.status(500).json({ error: "Failed to retrieve supplier" });
        }
    }

    // Create
    create(req, res) {
        try {
            // GET DATA FROM req.body
            const { name, phone, address, email } = req.body;
            // CREATE A BRAND
            Supplier.create(name, phone, address, email)
                .then((result) => {
                    return res.status(200).json({ supplier: result.rows[0] });
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({ error: "Failed to create supplier" });
                });
        } catch (error) {
            console.error("Error creating supplier", error);
            res.status(500).json({ error: "Failed to create supplier" });
        }
    }

    // Update
    update(req, res) {
        try {
            const id = req.params.id;
            // GET DATA FROM req.body
            const { name, phone, address, email } = req.body;
            // UPDATE A BRAND
            Supplier.update(id, name, phone, address, email)
                .then((result) => {
                    return res.status(200).json({ supplier: result.rows[0] });
                })
                .catch((err) => {
                    console.error(err)
                    return res.status(500).json({ error: "Failed to update supplier" });
                });
        } catch (error) {
            console.error("Error updating supplier", error);
            res.status(500).json({ error: "Failed to update supplier" });
        }
    }

    // Delete
    delete(req, res) {
        try {
            // DELETE A BRAND
            Supplier.delete(req.params.id)
                .then(() => {
                    return res.status(200).json({ message: "Supplier deleted successfully!" });
                })
                .catch((err) => {
                    console.log(err)
                    return res.status(500).json({ error: "Failed to delete supplier" });
                });
        } catch (error) {
            console.error("Error deleting supplier", error);
            res.status(500).json({ error: "Failed to delete supplier" });
        }
    }

}

module.exports = new SupplierController;