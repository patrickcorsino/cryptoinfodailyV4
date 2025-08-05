// All CoinGecko API calls and search logic
const BASE = "https://api.coingecko.com/api/v3";

export async function getMarketData() {
  try {
    const res = await fetch(`${BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h,24h,7d`);
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch {
    return [];
  }
}

export async function getCoinDetail(id) {
  try {
    const res = await fetch(`${BASE}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`);
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch {
    return null;
  }
}

export async function getTrending() {
  try {
    const res = await fetch(`${BASE}/search/trending`);
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data.coins || [];
  } catch {
    return [];
  }
}

export async function getFearGreed() {
  try {
    const res = await fetch("https://api.alternative.me/fng/?limit=1");
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data.data?.[0] || null;
  } catch {
    return null;
  }
}

export async function getGlobalStats() {
  try {
    const res = await fetch(`${BASE}/global`);
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return {
      total_market_cap: data.data?.total_market_cap?.usd || 0,
      total_volume_24h: data.data?.total_volume?.usd || 0,
      btc_dominance: data.data?.market_cap_percentage?.btc || 0,
      market_cap_percentage: data.data?.market_cap_percentage || {},
    };
  } catch {
    return {};
  }
}

export async function searchCoins(query) {
  try {
    const res = await fetch(`${BASE}/search?query=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data.coins || [];
  } catch {
    return [];
  }
}
