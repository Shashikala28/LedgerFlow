const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

// Helper to fetch JSON
const getJSON = async (url, headers = {}) => {
  const res = await fetch(url, { headers });
  return res.json();
};

router.get("/market-data", async (req, res) => {
  try {
    // ---------------- CRYPTO (CoinGecko) ----------------
    const cryptoURL =
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,ripple,cardano,solana,dogecoin&vs_currencies=inr,usd";

    // ---------------- FOREX (Frankfurter) ----------------
    const forexURL =
      "https://api.frankfurter.app/latest?from=USD&to=INR,EUR,GBP,JPY";

    // ---------------- INDIAN INDICES (Alpha Vantage) ----------------
    const alphaKey = process.env.ALPHA_KEY;

    const niftyURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=NIFTY_50&apikey=${alphaKey}`;
    const sensexURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=BSE_SENSEX&apikey=${alphaKey}`;
    const bankNiftyURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=BANKNIFTY&apikey=${alphaKey}`;

    // ---------------- INDIAN STOCKS ----------------
    const relianceURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=RELIANCE.BSE&apikey=${alphaKey}`;
    const tcsURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=TCS.BSE&apikey=${alphaKey}`;
    const hdfcURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=HDFCBANK.BSE&apikey=${alphaKey}`;
    const infosysURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=INFY.BSE&apikey=${alphaKey}`;
    const hclURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=HCLTECH.BSE&apikey=${alphaKey}`;
    const iciciURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=ICICIBANK.BSE&apikey=${alphaKey}`;

    // ---------------- GLOBAL INDICES ----------------
    const nasdaqURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=NASDAQ&apikey=${alphaKey}`;
    const sp500URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPX&apikey=${alphaKey}`;
    const dowURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=DJI&apikey=${alphaKey}`;
    const ftseURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=FTSE&apikey=${alphaKey}`;
    const nikkeiURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=N225&apikey=${alphaKey}`;
    const hangSengURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=HSI&apikey=${alphaKey}`;

    // ---------------- METALS (Metals API) ----------------
    const metalsURL = `https://metals-api.com/api/latest?access_key=${process.env.METALS_KEY}&symbols=XAU,XAG&base=USD`;

    // ---------------- CRUDE OIL (API Ninjas) ----------------
    const crudeOilURL = `https://api.api-ninjas.com/v1/commodities?name=crude_oil`;

    // Fire requests in parallel
    const [
      crypto,
      forex,
      nifty,
      sensex,
      bankNifty,
      reliance,
      tcs,
      hdfc,
      infosys,
      hcl,
      icici,
      nasdaq,
      sp500,
      dow,
      ftse,
      nikkei,
      hangSeng,
      metals,
      crude,
    ] = await Promise.all([
      getJSON(cryptoURL),
      getJSON(forexURL),
      getJSON(niftyURL),
      getJSON(sensexURL),
      getJSON(bankNiftyURL),
      getJSON(relianceURL),
      getJSON(tcsURL),
      getJSON(hdfcURL),
      getJSON(infosysURL),
      getJSON(hclURL),
      getJSON(iciciURL),
      getJSON(nasdaqURL),
      getJSON(sp500URL),
      getJSON(dowURL),
      getJSON(ftseURL),
      getJSON(nikkeiURL),
      getJSON(hangSengURL),
      getJSON(metalsURL),
      getJSON(crudeOilURL, {
        "X-Api-Key": process.env.NINJA_KEY,
      }),
    ]);

    // ---------------- FINAL RESULT ----------------
    res.json({
      crypto,
      forex,
      indices: {
        nifty: nifty["Global Quote"],
        sensex: sensex["Global Quote"],
        bankNifty: bankNifty["Global Quote"],
        nasdaq: nasdaq["Global Quote"],
        sp500: sp500["Global Quote"],
        dow: dow["Global Quote"],
        ftse: ftse["Global Quote"],
        nikkei: nikkei["Global Quote"],
        hangSeng: hangSeng["Global Quote"],
      },
      stocks: {
        reliance: reliance["Global Quote"],
        tcs: tcs["Global Quote"],
        hdfc: hdfc["Global Quote"],
        infosys: infosys["Global Quote"],
        hcl: hcl["Global Quote"],
        icici: icici["Global Quote"],
      },
      commodities: {
        gold: metals.rates?.XAU,
        silver: metals.rates?.XAG,
        crudeOil: crude,
      },
    });
  } catch (error) {
    console.error("Market API Error:", error);
    res.status(500).json({ error: "Failed to fetch market data" });
  }
});

module.exports = router;
