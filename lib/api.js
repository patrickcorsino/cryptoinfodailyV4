// Coingecko API helpers (handles API limits and empty state gracefully)
const COINGECKO_API = "https://api.coingecko.com/api/v3";

// 1. Get top 100 coins with market data + 7d sparkline
export async function getMarketData() {
  try {
    const res = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h,24h,7d`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// 2. Trending coins (small box)
export async function getTrending() {
  try {
    const res = await fetch(`${COINGECKO_API}/search/trending`, { next: { revalidate: 30 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.coins || []).slice(0, 5).map((c) => c.item);
  } catch {
    return [];
  }
}

// 3. Fear & Greed Index
export async function getFearGreed() {
  try {
    const res = await fetch("https://api.alternative.me/fng/?limit=1", { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ? data.data[0] : null;
  } catch {
    return null;
  }
}

// 4. Global Market Stats
export async function getGlobalStats() {
  try {
    const res = await fetch(`${COINGECKO_API}/global`, { next: { revalidate: 30 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

// 5. Individual coin detail
export async function getCoinDetail(id) {
  if (!id) return null;
  try {
    const res = await fetch(
      `${COINGECKO_API}/coins/${id}?localization=false&tickers=false&market_data=true&sparkline=true`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// 6. Search for coins
export async function searchCoins(query) {
  if (!query || query.length < 2) return [];
  try {
    const res = await fetch(`${COINGECKO_API}/search?query=${query}`, { next: { revalidate: 15 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.coins || [];
  } catch {
    return [];
  }
}
