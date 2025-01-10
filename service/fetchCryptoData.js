import axios from "axios";
import Crypto from "../model/crypto.model.js"

export const fetchCryptoData = async () => {
  const coinIds = ["bitcoin", "matic-network", "ethereum"];
  
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(
    ","
  )}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

  try {
    const response = await axios.get(url, {
      headers: {
        x_cg_demo_api_key: process.env.CG_DEMO_API_KEY,
      },
    });
    const data = response.data;

    for (const coinId of coinIds) {
      const coinData = data[coinId];
      const cryptoDoc = new Crypto({
        coinId,
        name: coinId.replace("-", " ").toUpperCase(),
        symbol: coinId.split("-")[0].toUpperCase(),
        current_price: coinData.usd,
        market_cap: coinData.usd_market_cap,
        price_change_percentage_24h: coinData.usd_24h_change,
      });

      await cryptoDoc.save();
    }

    console.log("Crypto data saved successfully");
  } catch (error) {
    console.error("Error fetching crypto data:", error.message);
  }
};
