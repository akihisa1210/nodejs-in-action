const canadianDollar = 0.91;

const roundTwoDecimals = (amount) => {
  return Math.round(amount * 100) / 100;
};

exports.canadianToUs = (canadian) => {
  return roundTwoDecimals(canadian * canadianDollar);
};

exports.usToCanadian = (us) => {
  return roundTwoDecimals(us / canadianDollar);
};
