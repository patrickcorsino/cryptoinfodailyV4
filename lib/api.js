// CoinGecko, Fear&Greed, global stats, trending

const BASE = "https://api.coingecko.com/api/v3";

export async function getMarketData() {
  try {
    const res = await fetch(
      `${BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h,24h,7d`,
      { next: { revalidate: 30 } }
    );
    return await res.json();
  } catch (e) {
    return [];
  }
}

export async function getTrending() {
  try {
    const res = await fetch(`${BASE}/search/trending`, { next: { revalidate: 120 } });
    const d = await res.json();
    return d?.coins?.map((c) => ({
      id: c.item.id,
      name: c.item.name,
      symbol: c.item.symbol,
      image: c.item.large,
      price_btc: c.item.price_btc,
    })) || [];
  } catch {
    return [];
  }
}

export async function getFearGreed() {
  try {
    const res = await fetch("https://api.alternative.me/fng/", { next: { revalidate: 180 } });
    const d = await res.json();
    return d.data?.[0] || null;
  } catch {
    return null;
  }
}

export async function getGlobalStats() {
  try {
    const res = await fetch(`${BASE}/global`, { next: { revalidate: 60 } });
    const d = await res.json();
    return {
      total_market_cap_usd: d.data?.total_market_cap?.usd,
      total_volume_usd: d.data?.total_volume?.usd,
      btc_dominance: d.data?.market_cap_percentage?.btc,
      active_cryptocurrencies: d.data?.active_cryptocurrencies,
    };
  } catch {
    return null;
  }
}
