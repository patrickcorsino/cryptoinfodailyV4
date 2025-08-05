// lib/utils.js

// Turns 1234567 into 1.23M, 1234 => 1.23K, etc.
export function abbreviateNumber(number) {
  if (!number && number !== 0) return "-";
  if (Math.abs(number) >= 1.0e+9) {
    return (number / 1.0e+9).toFixed(2) + "B";
  } else if (Math.abs(number) >= 1.0e+6) {
    return (number / 1.0e+6).toFixed(2) + "M";
  } else if (Math.abs(number) >= 1.0e+3) {
    return (number / 1.0e+3).toFixed(2) + "K";
  } else {
    return number.toLocaleString();
  }
}
