import React, { useEffect, useState } from "react";

interface Trade {
  id: string;
  size: number;
  timestamp: string;
  [key: string]: any; // Adjust the fields based on the API response
}

const TradesList: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://frontend-api.pump.fun/trades/all/AXMTDmzk9r87JqygGaKsN3ocQ5sAvtV2ej84dYZJpump?limit=200&offset=0&minimumSize=50000000",
          {
            method: "GET",
            // mode: "no-cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              accept: "*/*",
              "accept-language": "en-US,en;q=0.6",
              "if-none-match": 'W/"2235-NP2ABBnKeK/aXQQPAsoQYit7Jdo"',
              origin: "https://pump.fun",
              referer: "https://pump.fun/",
              "sec-ch-ua":
                '"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"Linux"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "sec-gpc": "1",
              "user-agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            },
          }
        );

        if (!response.ok) {
          console.log(response);
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setTrades(data); // Assuming `data` is an array of trades
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="trades-list">
      <h1>Trades</h1>
      {trades.length === 0 ? (
        <p>No trades found.</p>
      ) : (
        <ul>
          {trades.map((trade) => (
            <li key={trade.id} className="trade-item">
              <p>Trade ID: {trade.id}</p>
              <p>Size: {trade.size}</p>
              <p>Timestamp: {new Date(trade.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TradesList;
