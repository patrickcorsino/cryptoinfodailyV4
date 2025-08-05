// /lib/api.js

const COINGECKO = "https://api.coingecko.com/api/v3";
const ALTERNATIVE_API = "https://api.alternative.me/fng/";

export async function getMarketData() {
  try {
    const res = await fetch(`${COINGECKO}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h,24h,7d`);
    if (!res.ok) throw new Error('Failed to fetch coins');
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data;
  } catch (err) {
    console.error("[API] getMarketData failed:", err);
    return [];
  }
}

export async function getTrending() {
  try {
    const res = await fetch(`${COINGECKO}/search/trending`);
    if (!res.ok) throw new Error('Failed to fetch trending');
    const { coins } = await res.json();
    if (!Array.isArray(coins)) return [];
    // Normalize trending coins for your UI (optional: adjust as needed)
    return coins.map((c) => ({
      id: c.item.id,
      name: c.item.name,
      symbol: c.item.symbol,
      market_cap_rank: c.item.market_cap_rank,
      thumb: c.item.thumb,
      score: c.item.score
    }));
  } catch (err) {
    console.error("[API] getTrending failed:", err);
    return [];
  }
}

export async function getFearGreed() {
  try {
    const res = await fetch(`${ALTERNATIVE_API}?limit=1`);
    if (!res.ok) throw new Error('Failed to fetch fear/greed index');
    const { data } = await res.json();
    if (!Array.isArray(data) || !data.length) return null;
    return data[0];
  } catch (err) {
    console.error("[API] getFearGreed failed:", err);
    return null;
  }
}

export async function getGlobalStats() {
  try {
    const res = await fetch(`${COINGECKO}/global`);
    if (!res.ok) throw new Error('Failed to fetch global stats');
    const { data } = await res.json();
    if (!data) return null;
    return data;
  } catch (err) {
    console.error("[API] getGlobalStats failed:", err);
    return null;
  }
}

// Product/coin detail API
export async function getCoinDetail(id) {
  if (!id) return null;
  try {
    const res = await fetch(`${COINGECKO}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`);
    if (!res.ok) throw new Error('Failed to fetch coin detail');
    const data = await res.json();
    if (!data) return null;
    return data;
  } catch (err) {
    console.error("[API] getCoinDetail failed:", err);
    return null;
  }
}

// Search for coins by name or symbol
export async function searchCoins(query) {
  if (!query) return [];
  try {
    const res = await fetch(`${COINGECKO}/search?query=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to search coins');
    const { coins } = await res.json();
    if (!Array.isArray(coins)) return [];
    return coins;
  } catch (err) {
    console.error("[API] searchCoins failed:", err);
    return [];
  }
}
