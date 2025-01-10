import Crypto from "../model/crypto.model.js";

export const findDeviation = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res
      .status(400)
      .json({ message: "Coin query parameter is required." });
  }

  try {
    const records = await Crypto.find({ coinId: coin })
      .sort({ created_at: -1 })
      .limit(100);
    if (records.length === 0) {
      return res.status(404).json({
        message: "No records found for the specified cryptocurrency.",
      });
    }

    const prices = records.map((record) => record.current_price);
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance =
      prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
      prices.length;
    const deviation = Math.sqrt(variance);

    res.status(200).json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error calculating deviation", error: error.message });
  }
};

export const listStats = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res
      .status(400)
      .json({ message: "Coin query parameter is required." });
  }

  try {
    const crypto = await Crypto.findOne({ coinId: coin }).sort({
      created_at: -1,
    });
    if (!crypto) {
      return res
        .status(404)
        .json({ message: "Cryptocurrency data not found." });
    }

    res.status(200).json({
      price: crypto.current_price,
      marketCap: crypto.market_cap,
      "24hChange": crypto.price_change_percentage_24h,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving cryptocurrency stats",
      error: error.message,
    });
  }
};
