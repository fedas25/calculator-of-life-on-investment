const startOfInvestment = document.getElementById("startOfInvestment");
const beginningRetirement = document.getElementById("beginningRetirement");
const dateDeath = document.getElementById("dateDeath");
const amountMoneyPerYear = document.getElementById("amountMoneyPerYear");
const message = document.getElementById("message");
const ctx = document.getElementById("canvas");

 // можно убрать
let retiredYears = null;
let saveYears = null;
let requiredAmountMoneyInYear = null;
let amountDeferralYear = null;
let retirementSize = null;

let coefficientX = 1.04;
let coefficientY = null;
let coefficientXForAccumulation = 1.04;

showGraph = () => { // получить данные в виде массива
    
}

// получить данные
provideСalculations = () => { // тут собрать объект

    for (let i = 0; i < retiredYears - 1; i++) { // отображение графика
        calculateCoefficientsInStep();
    }

    requiredAmountMoneyInYear = Math.ceil(coefficientY / coefficientX); // на всю жизнь

    for (let i = 0; i < saveYears - 1; i++) {
       stepCalculationOfYearsContribution();
    }

    amountDeferralYear = Math.ceil(requiredAmountMoneyInYear / coefficientXForAccumulation);

    showMessage();
    resetValues();
}

calculateCoefficientsInStep = () => { // сколько нужно в год
    coefficientX = coefficientX + (coefficientX * 0.04);
    coefficientY = coefficientY + (coefficientY * 0.04) + retirementSize;
}

stepCalculationOfYearsContribution = () => { // сколько нужно в год
    coefficientXForAccumulation += 1 + ( coefficientXForAccumulation * 0.04 );
}

const showMessage = () => { // кинуть апогей денег и то, сколько нцжно откладывать
    message.innerHTML = "";
    message.innerHTML = `Вам нужно откладывать по <span class="data">${amountDeferralYear}$</span>
    в год в течении <span class="data">${saveYears}</span> лет
    чтобы накопить <span class="data">${requiredAmountMoneyInYear}$</span>
    для жизни на пенсии <span class="data">${retiredYears}</span> лет.`; // года / лет
}

const resetValues = () => { // постараться убрать
    [coefficientY, coefficientX, retiredYears, saveYears, requiredAmountMoneyInYear, coefficientXForAccumulation, amountDeferralYear, retirementSize]
    = [null, 1.04, null, null, null, 1.04, null, null];
}

setValues = () => { // постараться убрать
    retiredYears = Number(dateDeath.value - beginningRetirement.value);
    coefficientY = Number(amountMoneyPerYear.value);
    retirementSize = Number(coefficientY);
    saveYears = Number(beginningRetirement.value - startOfInvestment.value);
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        setValues();
        provideСalculations();
    }
})

document.querySelector(".button").addEventListener("click", () => {
    setValues();
    provideСalculations();
})