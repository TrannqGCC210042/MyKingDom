const { Order } = require("../models/Order");
const { OrderDetail } = require("../models/OrderDetail");
const { Product } = require("../models/Product");

class StatisticController {
  async list(req, res) {
    try {
      // BEST SELLING
      const bestSelling = await Product.getBestSeller();
      // BEST SELLING BRAND
      const bestSellingBrand = await Product.getBestSellerByBrand();
      // REVENUE BY MONTH OF EACH BRANCH
      const revenueByMonthOfEachBranch =
        await Product.getRevenueByMonthOfEachBranch();

      return res.render("statistic/index", {
        style: "statistic.css",
        title: "Statistic",
        script: "statistic.js",
        bestSelling: bestSelling.rows,
        bestSellingBrand: bestSellingBrand.rows,
        revenueByMonthOfEachBranch: revenueByMonthOfEachBranch.rows,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to retrieve statistic" });
    }
  }

  async chart(req, res) {
    try {
      // BEST SELLING
      const bestSelling = await Product.getBestSeller();
      // BEST SELLING BRAND
      const bestSellingBrand = await Product.getBestSellerByBrand();
      // REVENUE BY MONTH OF EACH BRANCH
      const revenueByMonthOfEachBranch =
        await Product.getRevenueByMonthOfEachBranch();

      return res.status(200).json({
        bestSelling: bestSelling.rows,
        bestSellingBrand: bestSellingBrand.rows,
        revenueByMonthOfEachBranch: revenueByMonthOfEachBranch.rows,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to retrieve statistic" });
    }
  }
}
module.exports = new StatisticController();
