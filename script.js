const primary_currency = document.getElementById("primary-cur");
const secondary_currency = document.getElementById("secondary-cur");

const primary_input = document.querySelector(".primary-input");
const secondary_input = document.querySelector(".secondary-input");
const currency_info = document.querySelector(".currency-info");

primary_currency.addEventListener("change", () => {
  updateRate();
});
secondary_currency.addEventListener("change", () => {
  updateRate();
});
primary_input.addEventListener("input", () => {
  updateRate();
});

updateRate();

async function updateRate() {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/f493bd2416522f50048b2469/latest/${primary_currency.value}`
  );
  const responseJson = await response.json();
  const conversionRate = responseJson.conversion_rates;

  primary_input.value = "1";

  currency_info.innerText = `1 ${primary_currency.value} = ${conversionRate[
    secondary_currency.value
  ].toFixed(2)} ${secondary_currency.value}`;

  secondary_input.value = (
    conversionRate[secondary_currency.value] * primary_input.value
  ).toFixed(2);
}
