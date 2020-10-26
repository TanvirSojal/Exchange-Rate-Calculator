const exchangeAPI = "https://open.exchangerate-api.com/v6/latest";

let exchangeRates = {};
let currencies = [];
const standard = "USD";

initialize = async () => {
    try{
        const response = await fetch(exchangeAPI);
        const data = await response.json();
        exchangeRates = data.rates;
        currencies = Object.keys(exchangeRates);

        setCurrencyList('currencyList1');
        setCurrencyList('currencyList2');
        
        convert();

    } catch(err){
        console.log(err);
    }
};

setCurrencyList = (select_id) => {
    let select = document.getElementById(select_id);
    for (let i = 0; i < currencies.length; i++){
        let option = document.createElement('option');
        option.value = currencies[i];
        option.innerHTML = currencies[i];
        select.appendChild(option);
    }

    if (select_id === "currencyList2"){
        select.value = "EUR";
    }
}

convert = () => {
    const currency1 = document.getElementById('currencyList1').value;
    const currency2 = document.getElementById('currencyList2').value;
    let input = document.getElementById('input').value;
    if (input === "") input = "0";
    input = Number.parseFloat(input);

    const value1 = exchangeRates[currency1];
    const value2 = exchangeRates[currency2];
    const standard_value = exchangeRates[standard];

    let rate = (standard_value / value1) * value2;
    document.getElementById('rate').innerText = "1 " + currency1 + " = " + rate.toFixed(6) + " " + currency2;

    const result = (input * value1) * rate;
    document.getElementById('output').value = result.toFixed(3);
}

swap = () => {
    let currencyList1 = document.getElementById('currencyList1');
    let currencyList2 = document.getElementById('currencyList2');
    [currencyList1.value, currencyList2.value] = [currencyList2.value, currencyList1.value];
    convert();
}