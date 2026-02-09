function convertTemp() {
  const temp = document.getElementById("tempInput").value;
  const type = document.getElementById("tempType").value;
  const result = document.getElementById("result");

  if (temp === "" || isNaN(temp)) {
    result.innerText = "❌ Please enter a valid number";
    return;
  }

  let converted;

  if (type === "celsius") {
    converted = (temp * 9/5) + 32;
    result.innerText = `${converted.toFixed(2)} °F`;
  }
  else if (type === "fahrenheit") {
    converted = (temp - 32) * 5/9;
    result.innerText = `${converted.toFixed(2)} °C`;
  }
  else if (type === "kelvin") {
    converted = temp - 273.15;
    result.innerText = `${converted.toFixed(2)} °C`;
  }
}
