let expression = "";
let lastAnswer = 0;

function append(value) {
  expression += value;
  document.getElementById("expression").innerText = expression;
}

function calculate() {
  try {
    let result = eval(expression);
    document.getElementById("result").innerText = result;
    lastAnswer = result;
  } catch {
    document.getElementById("result").innerText = "Error";
  }
}

function clearAll() {
  expression = "";
  document.getElementById("expression").innerText = "";
  document.getElementById("result").innerText = "0";
}

function del() {
  expression = expression.slice(0, -1);
  document.getElementById("expression").innerText = expression;
}

function useAns() {
  expression += lastAnswer;
  document.getElementById("expression").innerText = expression;
}

function toggleSign() {
  if (expression.startsWith("-")) {
    expression = expression.slice(1);
  } else {
    expression = "-" + expression;
  }
  document.getElementById("expression").innerText = expression;
}
