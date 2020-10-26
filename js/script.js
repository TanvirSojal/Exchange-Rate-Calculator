const exchangeAPI = "https://api.exchangerate-api.com/v4/latest/";

let exchangeRates;

initialize = async () => {
    const response = await fetch(exchangeAPI);
    const data = await response.json();
    exchangeRates = data.rates;
    console.log(exchangeRates);
};