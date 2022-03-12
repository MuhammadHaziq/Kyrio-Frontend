export let removeChars = (num) => {
  let newNum = String(num).replace(/[^\d.-]/g, "");

  newNum = parseFloat(newNum) ? parseFloat(newNum) : 0;

  return newNum;
};

export let amountFormat = (num, decimal, sign = "") => {
  // num = truncateDecimals(num, decimal);
  // return roundToDecimal(numberWithCommas(num, decimal), decimal) + sign;
  return numberWithCommas(num, decimal) + sign;
};
export let truncateDecimals = (num, digits) => {
  var numS = num?.toString(),
    decPos = numS?.indexOf("."),
    substrLength = decPos == -1 ? numS?.length : 1 + decPos + digits,
    trimmedResult = numS?.substr(0, substrLength),
    finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;
  if (num !== 0 && finalResult == 0 && digits == 0) {
    finalResult = 1;
  }
  return parseFloat(finalResult);
};
export let roundToDecimal = (num, decimal, upOrDown = 0) => {
  if (num) {
    if (typeof num !== "number") {
      num = parseFloat(num);
    }
    let t = parseFloat(num.toFixed(decimal, upOrDown)).toFixed(decimal);
    return (Math.round(t * 1e2) / 1e2).toFixed(decimal);
  }
  return parseFloat(0).toFixed(decimal);
};

export let roundNum = (num) => {
  num = parseFloat(num);

  return Math.round(num * 100) / 100;
};

export let numberWithCommas = (num, decimal) => {
  num = parseFloat(num);
  return num
    .toFixed(decimal)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export let roundToThree = (num, upOrDown = 1) => {
  if (num) {
    if (typeof num !== "number") {
      num = parseFloat(num);
    }
    let t = parseFloat(num.toFixed(3, upOrDown)).toFixed(3);
    return Math.round(t * 1e2) / 1e2;
  }
  return 0.0;
};

export let roundToTwo = (num, upOrDown = 1) => {
  if (num) {
    if (typeof num !== "number") {
      num = parseFloat(num);
    }
    let t = parseFloat(num.toFixed(2, upOrDown)).toFixed(2);
    return Math.round(t * 1e2) / 1e2;
  }
  return 0.0;
};

export let roundToOne = (num) => {
  return Math.round(num * 10) / 10;
};

export let currencyFormat = (num, currency) => {
  let newNum = num > 0 ? roundToTwo(num) : parseFloat(num);
  return "£" + numberWithCommas(newNum);
};

export let stringToNum = (str) => {
  if (str && typeof str == "string") {
    return parseFloat(str.replace(/[^\d.-]/g, ""));
  } else if (str && typeof str == "number") {
    return str;
  } else {
    return "";
  }
};
