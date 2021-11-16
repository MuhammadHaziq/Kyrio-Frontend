
export let removeChars = (num) => {
    let newNum = String(num).replace(/[^\d.-]/g,'');

    newNum = parseFloat(newNum) ? parseFloat(newNum) : 0;

    return newNum;
};

export let amountFormat = (num, decimal) => {
    return roundToDecimal(numberWithCommas(num),decimal);
}

export let roundToDecimal = (num, decimal, upOrDown = 1) => {
    
    if(num) {
        if(typeof(num)!=="number"){
            num = parseFloat(num);
        }
        let t = parseFloat(num.toFixed(2, upOrDown)).toFixed(decimal);
        return (Math.round(t * 1e2) / 1e2).toFixed(decimal)
    }
    return parseInt(0).toFixed(decimal);
};

export let roundNum = (num) => {
    num = parseFloat(num);

    return Math.round(num * 100) / 100;
};

export let numberWithCommas = (num) => {
    num = parseFloat(num);
    return num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};

export let roundToThree = (num, upOrDown = 1) => {
    if(num) {
        if(typeof(num)!=="number"){
            num = parseFloat(num);
        }
        let t = parseFloat(num.toFixed(3, upOrDown)).toFixed(3);
        return Math.round(t * 1e2) / 1e2
    }
    return 0.000;
};

export let roundToTwo = (num, upOrDown = 1) => {
    if(num) {
        if(typeof(num)!=="number"){
            num = parseFloat(num);
        }
        let t = parseFloat(num.toFixed(2, upOrDown)).toFixed(2);
        return Math.round(t * 1e2) / 1e2
    }
    return 0.00;
};

export let roundToOne = (num) => {
    return Math.round( num * 10 ) / 10
};


export let currencyFormat = (num, currency) => {
    let newNum = num > 0 ? roundToTwo(num) : parseFloat(num);
    return '£' + numberWithCommas(newNum);
};

export let stringToNum = (str) => {
    if(str && typeof str == 'string' ){

        return parseFloat(str.replace(/[^\d.-]/g, ''));

    } else if(str && typeof str == 'number') {

        return str;

    } else {
        return '';
    }
};