const startOfInvestment = document.getElementById("startOfInvestment");
const beginningRetirement = document.getElementById("beginningRetirement");
const dateDeath = document.getElementById("dateDeath");
const amountMoneyPerYear = document.getElementById("amountMoneyPerYear");
const message = document.getElementById("message");

let coefficientY = null; // можно почистить немного
let coefficientX = 1.04;
let coefficientXForAccumulation = 1.04;
let retiredYears = null;
let saveYears = null;
let requiredAmountMoneyInYear = null;
let amountDeferralYear = null;
let retirementSize = null;

provideСalculations = () => {
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

const showMessage = () => {
    message.innerText = "";
    message.innerText = `${requiredAmountMoneyInYear}$ нужно для жизни на пенсии ${retiredYears} лет
    откладывая по ${amountDeferralYear}$ в год в течении ${saveYears} лет`; // года лет
}

showGraph = () => {

}

const resetValues = () => {
    [coefficientY, coefficientX, retiredYears, saveYears, requiredAmountMoneyInYear, coefficientXForAccumulation, amountDeferralYear, retirementSize]
    = [null, 1.04, null, null, null, 1.04, null, null];
}

setValues = () => {
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

document.querySelector("div").addEventListener("click", () => {
    setValues();
    provideСalculations();
})