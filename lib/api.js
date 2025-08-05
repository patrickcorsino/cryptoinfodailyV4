// /lib/api.js

// Get full market data for 100 coins (used on homepage/table)
export async function getMarketData() {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h,24h,7d`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error('Failed to fetch market data');
    return await res.json();
  } catch (e) {
    return [];
  }
}

// Get trending coins
export async function getTrending() {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/search/trending`);
    if (!res.ok) throw new Error('Failed to fetch trending coins');
    const data = await res.json();
    return data.coins ? data.coins.map((c) => c.item) : [];
  } catch (e) {
    return [];
  }
}

// Get Fear & Greed Index (alternative.me)
export async function getFearGreed() {
  try {
    const res = await fetch(
      "https://api.alternative.me/fng/?limit=1"
    );
    if (!res.ok) throw new Error('Failed to fetch fear & greed index');
    const data = await res.json();
    return data.data ? data.data[0] : null;
  } catch (e) {
    return null;
  }
}

// Get global stats (market cap, volume, BTC dominance)
export async function getGlobalStats() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/global"
    );
    if (!res.ok) throw new Error('Failed to fetch global stats');
    const data = await res.json();
    return data.data || null;
  } catch (e) {
    return null;
  }
}

// Get single coin detail
export async function getCoinDetail(id) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
    );
    if (!res.ok) throw new Error('Failed to fetch coin detail');
    return await res.json();
  } catch (e) {
    return null;
  }
}

// Search for coins
export async function searchCoins(query) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`
    );
    if (!res.ok) throw new Error('Failed to search coins');
    return await res.json();
  } catch (e) {
    return { coins: [] };
  }
}
