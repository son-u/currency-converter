import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (currency) {
      fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch data for ${currency}`);
          }
          return res.json();
        })
        .then((res) => setData(res[currency]))
        .catch((error) => {
          console.error("Error fetching currency data:", error);
          setData({});
        });
    }
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
