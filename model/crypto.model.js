import mongoose from "mongoose";

const cryptoSchema = mongoose.Schema(
  {
    coinId: String,
    name: String,
    symbol: String,
    current_price: Number,
    market_cap: Number,
    price_change_percentage_24h: Number,
  },
  {
    timestamps: true,
  }
);

const Crypto = mongoose.model("Crypto", cryptoSchema);

export default Crypto;
