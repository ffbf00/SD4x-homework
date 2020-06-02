var entry = '';
var firstNum = undefined;
var secondNum = undefined;
var answer = 0;
var operation = -1; // 1-addition, 2-subtraction, 3-multiplication, 4-division
var operatorVal = -1;
var operatorClicked = false;
var complete = false;
var continued = false;

function setNum(first) {
    if (first) {
        firstNum = Number(entry);
        secondNum = undefined;
    } else if (complete) {
        firstNum = Number(entry);
        calculate();
    } else {
        secondNum = Number(entry);
        calculate();
    }
}

function calculate() {
    if (operation == 1) {
        answer = firstNum + secondNum;
    } else if (operation == 2) {
        answer = firstNum - secondNum;
    } else if (operation == 3) {
        answer = firstNum * secondNum;
    } else if (operation == 4) {
        answer = firstNum / secondNum;
    }
}

function updateDisplay() {
    $('#display').val(entry);
}

// number buttons
$('button.number').click(function() {
    if (operatorClicked) {
        if (continued) {
            setNum(false);
            firstNum = answer;
            entry = String(answer);
            updateDisplay();
            operation = operatorVal;
        } else {
            operation = operatorVal;
            setNum(true);
        }
        entry = '';
        continued = true;
        operatorClicked = false;
    }
    if (complete) {
        complete = false;
        entry = '';
    }
    entry += $(this).val();
    updateDisplay();
});

// operator buttons
$('button.operator').click(function() {
    operatorVal = $(this).val();
    operatorClicked = true;
});

// equals button
$('#equalsButton').click(function() {
    if (firstNum != undefined && !(firstNum != undefined && entry == '')) {
        setNum(false);
        entry = String(answer);
        updateDisplay();
        complete = true;
        continued = false;
    }
});

// clear button
$('#clearButton').click(function() {
    entry = '';
    firstNum = undefined;
    secondNum = undefined;
    answer = 0;
    operation = -1;
    complete = false;
    continued = false;
    updateDisplay();
});