/*-------------------------------- Constants --------------------------------*/
const calculator = document.querySelector('#calculator');
const display = document.querySelector('.display');
/*-------------------------------- Variables --------------------------------*/
// Store the first number, second number, operator, and whether we're waiting for second number input
let firstInputedNum = '';
let secondInputedNum = '';
let operator = '';
let waitingForSecondNumber = false;

/*----------------------------- Event Listeners -----------------------------*/
calculator.addEventListener('click', (event) => {
  const clickedButton = event.target;
  const value = clickedButton.innerText;

  // Only do something if a button was clicked
  if (!clickedButton.classList.contains('button')) return;

  // Clear button resets everything
  if (value === 'C') {
    firstInputedNum = '';
    secondInputedNum = '';
    operator = '';
    waitingForSecondNumber = false;
    display.textContent = '0';
    return;
  }

  // If a number button is clicked
  if (clickedButton.classList.contains('number')) {
    if (!waitingForSecondNumber) {
      // Add to the first number
      firstInputedNum += value;
      display.textContent = firstInputedNum;
    } else {
      // Add to the second number
      secondInputedNum += value;
      display.textContent = secondInputedNum;
    }
    return;
  }

  // If an operator (+, -, *, /) is clicked
  if (['+', '-', '*', '/'].includes(value)) {
    if (firstInputedNum === '') return; // Don't allow operator before first number

    operator = value;
    waitingForSecondNumber = true;
    display.textContent = '0'; // Reset display for second number
    return;
  }

  // If equals button (=) is clicked
  if (clickedButton.classList.contains('equals')) {
    // Need both numbers and an operator to calculate
    if (firstInputedNum === '' || secondInputedNum === '' || operator === '') return;

    // convert from string to numbers
    const num1 = parseFloat(firstInputedNum);
    const num2 = parseFloat(secondInputedNum);
    let result;

    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num2 !== 0 ? num1 / num2 : 'Error'; // used the ternary operator to prevent divide by zero
        break;
    }

    display.textContent = result; // displays result

    // Reset variables for next calculation, but keep result as first number
    firstInputedNum = result.toString();
    secondInputedNum = '';
    operator = '';
    waitingForSecondNumber = false;
  }
});
