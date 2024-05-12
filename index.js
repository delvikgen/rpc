const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const rpc_list = [
  "https://mainnet.helius-rpc.com/?api-key=a80c11f0-0a4e-4952-aeb5-22995b32f6ff",
  "https://solana-mainnet.g.alchemy.com/v2/hTBlS_DeSEcDtkLTzag7iGVaFnl-BoQL",
  "https://solana-mainnet.g.alchemy.com/v2/0RUSdKlnewZHch52hXwKU2vjCtPK4Pxh",
  "https://solana-mainnet.g.alchemy.com/v2/8iKwHDMN4ePMoDHUBrxMl7byeiiMWgwN",
  "https://solana-mainnet.g.alchemy.com/v2/puoOe6F3wOy_GBV-VT4wlVWp1ENrl6ZE",
  "https://solana-mainnet.g.alchemy.com/v2/6xIpbisSP3R796xma9Wow5FnVN2mK1P8",
  "https://solana-mainnet.g.alchemy.com/v2/VSJB4KZGOJ-YIRgD2q3V9I0hKf5AuiEL",
  "https://carly-wxaqv1-fast-mainnet.helius-rpc.com",
  "https://mainnet.helius-rpc.com/?api-key=3bf4eca1-e78d-42d7-9980-82df70e9ac78",
  "https://frosty-wispy-wave.solana-mainnet.quiknode.pro/0f595564aab37c5f0805fe58eaa275dd76e3e3f7/",
  "https://go.getblock.io/ff4bf2c2f4f044d5a013d69c1364cbca",
  "https://go.getblock.io/2207d8cf9141409db31b291f2194b8b4",
  "https://go.getblock.io/0202055881f84be294682526d87b77c0",
  "https://solana-mainnet.g.alchemy.com/v2/XpC4QaxJ6Q1CA3li429QcTgOQNVO2rDc",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // ""
];

app.use(bodyParser.json());
app.get("/", (req, res) => {
  const response = {
    message: "Hello from the server!",
  };
  res.json(response);
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow POST and OPTIONS methods
  "Access-Control-Allow-Headers": "Content-Type", // Allow Content-Type header
};

function getRandomItem() {
  if (!Array.isArray(rpc_list) || rpc_list.length === 0) {
    throw new Error("Input must be a non-empty array");
  }

  const randomIndex = Math.floor(Math.random() * rpc_list.length);
  return rpc_list[randomIndex];
}

// Function to handle OPTIONS requests
function handleOptions(req, res) {
  res.set(corsHeaders);
  res.status(200).send(); // Send an empty response with CORS headers
}

app.options("/rpc", handleOptions);

app.post("/rpc", async (req, res) => {
  try {
    const data = req.body;
    // const proxyUrl = `https://mainnet.helius-rpc.com/?api-key=a80c11f0-0a4e-4952-aeb5-22995b32f6ff`;
    const proxyUrl = getRandomItem();
    // console.log(proxyUrl);

    const response = await fetch(proxyUrl, {
      method: "POST", // Assuming the Helius API expects a POST request (adjust if necessary)
      headers: {
        "Content-Type": "application/json", // Set content type for JSON data
      },
      body: JSON.stringify(data), // Stringify the request body
    });

    const datax = await response.text(); // Or response.buffer() for binary data
    // console.log(datax);
    res.set("Content-Type", response.headers.get("Content-Type")); // Get content type from original response
    res.send(datax);
  } catch (error) {
    console.error("Error in proxy request:", error);
    res.status(500).json({ message: "Internal server error" }); 
  }
});

app.get("/rpc", async (req, res) => {
  try {
    // const proxyUrl = `https://mainnet.helius-rpc.com/?api-key=a80c11f0-0a4e-4952-aeb5-22995b32f6ff`;
    const proxyUrl = getRandomItem();
    // console.log(proxyUrl);

    const response = await fetch(proxyUrl, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json", 
      },
    });

    const data = await response.text(); 
    console.log(data);
    res.set("Content-Type", response.headers.get("Content-Type")); 
    res.send(data);
  } catch (error) {
    console.error("Error in proxy request:", error);
    res.status(500).json({ message: "Internal server error" }); 
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
