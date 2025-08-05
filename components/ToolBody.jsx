import { useState } from "react";

export default function ToolBody({ tool }) {
  // All tools
  if (tool === "position") {
    // Position Size Calculator
    const [equity, setEquity] = useState("");
    const [risk, setRisk] = useState("");
    const [stop, setStop] = useState("");
    const [result, setResult] = useState(null);

    function calculate(e) {
      e.preventDefault();
      const eNum = parseFloat(equity);
      const rNum = parseFloat(risk) / 100;
      const sNum = parseFloat(stop) / 100;
      if (!eNum || !rNum || !sNum) return setResult(null);
      setResult(((eNum * rNum) / Math.abs(sNum)).toFixed(2));
    }

    return (
      <form onSubmit={calculate} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Position Size Calculator</h2>
        <div>
          <label className="block mb-1 text-sm">Account Equity ($)</label>
          <input value={equity} onChange={e => setEquity(e.target.value)} type="number" className="w-full px-3 py-2 rounded-lg bg-darkBg text-white" />
        </div>
        <div>
          <label className="block mb-1 text-sm">Risk Per Trade (%)</label>
          <input value={risk} onChange={e => setRisk(e.target.value)} type="number" className="w-full px-3 py-2 rounded-lg bg-darkBg text-white" />
        </div>
        <div>
          <label className="block mb-1 text-sm">Stop Loss (%)</label>
          <input value={stop} onChange={e => setStop(e.target.value)} type="number" className="w-full px-3 py-2 rounded-lg bg-darkBg text-white" />
        </div>
        <button type="submit" className="px-6 py-2 bg-degen rounded-lg text-darkBg font-bold mt-2">Calculate</button>
        {result && (
          <div className="mt-3 font-semibold text-lg">
            Position Size: <span className="text-degen">${result}</span>
          </div>
        )}
      </form>
    );
  }
  if (tool === "profit") {
    // Profit/Loss Calculator
    const [entry, setEntry] = useState("");
    const [exit, setExit] = useState("");
    const [amount, setAmount] = useState("");
    const [result, setResult] = useState(null);

    function calculate(e) {
      e.preventDefault();
      const ent = parseFloat(entry);
      const ex = parseFloat(exit);
      const amt = parseFloat(amount);
      if (!ent || !ex || !amt) return setResult(null);
      setResult(((ex - ent) * amt).toFixed(2));
    }

    return (
      <form onSubmit={calculate} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Profit / Loss Calculator</h2>
        <div>
          <label className="block mb-1 text-sm">Entry Price ($)</label>
          <input value={entry} onChange={e => setEntry(e.target.value)} type="number" className="w-full px-3 py-2 rounded-lg bg-darkBg text-white" />
        </div>
        <div>
          <label className="block mb-1 text-sm">Exit Price ($)</label>
          <input value={exit} onChange={e => setExit(e.target.value)} type="number" className="w-full px-3 py-2 rounded-lg bg-darkBg text-white" />
        </div>
        <div>
          <label className="block mb-1 text-sm">Amount</label>
          <input value={amount} onChange={e => setAmount(e.target.value)} type="number" className="w-full px-3 py-2 rounded-lg bg-darkBg text-white" />
        </div>
        <button type="submit" className="px-6 py-2 bg-degen rounded-lg text-darkBg font-bold mt-2">Calculate</button>
        {result && (
          <div className="mt-3 font-semibold text-lg">
            Result: <span className={result >= 0 ? "text-green-400" : "text-red-400"}>${result}</span>
          </div>
        )}
      </form>
    );
  }
  if (tool === "roi") {
    // ROI Calculator
    const [initial, setInitial] = useState("");
    const [final, setFinal] = useState("");
    const [result, setResult] = useState(null);

    function calculate(e) {
      e.preventDefault();
      const i = parseFloat(initial);
      const f = parseFloat(final);
      if (!i || !f) return setResult(null);
      setResult((((f - i) / i) * 100).toFixed(2));
    }

    return (
      <form onSubmit={calculate} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">ROI Calculator</h2>
        <div>
          <label className="block mb-1 text-sm">Initial Investment ($)</label>
          <input value={initial} onChange={e => setInitial(e.target.value)} type="number" className="w-full px-3 py-2 rounded-lg bg-darkBg text-white" />
        </div>
        <div>
          <label className="block mb-1 text-sm">Final Value ($)</label>
          <input value={final} onChange={e => setFinal(e.target.value)} type="number" className="w-full px-3 py-2 rounded-lg bg-darkBg text-white" />
        </div>
        <button type="submit" className="px-6 py-2 bg-degen rounded-lg text-darkBg font-bold mt-2">Calculate</button>
        {result && (
          <div className="mt-3 font-semibold text-lg">
            ROI: <span className={result >= 0 ? "text-green-400" : "text-red-400"}>{result}%</span>
          </div>
        )}
      </form>
    );
  }
  if (tool === "conversion") {
    // Crypto Conversion Tool (Simple, USD <-> Crypto, BTC/ETH/USDT)
    const [amount, setAmount] = useState("");
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("btc");
    const [result, setResult] = useState(null);
    const [rates, setRates] = useState({ btc: 0, eth: 0, usdt: 1 });

    // Fetch rates on mount
    useState(() => {
      fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd")
        .then((r) => r.json())
        .then((d) =>
          setRates({
            btc: d.bitcoin.usd,
            eth: d.ethereum.usd,
            usdt: d.tether.usd,
          })
        );
    }, []);

    function convert(e) {
      e.preventDefault();
      const amt = parseFloat(amount);
      if (!amt || !rates.btc) return setResult(null);
      let usd;
      // Convert to USD first
      if (from === "usd") usd = amt;
      else usd = amt * rates[from];
      // Convert to "to"
      let res;
      if (to === "usd") res = usd;
      else res = usd / rates[to];
      setResult(res);
    }

    return (
      <form onSubmit={convert} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Crypto Conversion Tool</h2>
        <div>
          <label className="block mb-1 text-sm">Amount</label>
          <input value={amount} onChange={e => setAmount(e.target.value)} type="number" className="w-full px-3 py-2 rounded-lg bg-darkBg text-white" />
        </div>
        <div className="flex gap-3">
          <div>
            <label className="block mb-1 text-sm">From</label>
            <select value={from} onChange={e => setFrom(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-darkBg text-white">
              <option value="usd">USD</option>
              <option value="btc">BTC</option>
              <option value="eth">ETH</option>
              <option value="usdt">USDT</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm">To</label>
            <select value={to} onChange={e => setTo(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-darkBg text-white">
              <option value="usd">USD</option>
              <option value="btc">BTC</option>
              <option value="eth">ETH</option>
              <option value="usdt">USDT</option>
            </select>
          </div>
        </div>
        <button type="submit" className="px-6 py-2 bg-degen rounded-lg text-darkBg font-bold mt-2">Convert</button>
        {result && (
          <div className="mt-3 font-semibold text-lg">
            Result: <span className="text-degen">{result.toFixed(6)}</span>
          </div>
        )}
      </form>
    );
  }

  // Default
  return <div className="text-white">Select a tool from the sidebar.</div>;
}
