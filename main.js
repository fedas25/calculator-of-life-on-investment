const startOfInvestment = document.getElementById("startOfInvestment");
const beginningRetirement = document.getElementById("beginningRetirement");
const dateDeath = document.getElementById("dateDeath");
const amountMoneyPerYear = document.getElementById("amountMoneyPerYear");
const message = document.getElementById("message");

const equation = {
    coefficientY: null, // 100
    coefficientX: 1.04,  // x в год // поменять, чтобы -1 не делать с 0 начинать ?
    retiredYears: null,
    saveYears: null,
    requiredAmountMoneyInYear: null,
    coefficientXForAccumulation: 1.04, // поменять, чтобы -1 не делать с 0 начинать ?
    amountDeferralYear: null,
    retirementSize: null
}
    // calculationOfYearsContribution = () => { // непонятки с годами
    //     for (let i = 0; i < equation.saveYears - 1; i++) {
    //        stepCalculationOfYearsContribution();
    //     }
    //   equation.amountDeferralYear = Math.ceil(equation.requiredAmountMoneyInYear / equation.coefficientXForAccumulation);
    // }

    // stepCalculationOfYearsContribution = () => { // сколько нужно в месяц
    //     equation.coefficientXForAccumulation += equation.coefficientXForAccumulation + ( equation.coefficientXForAccumulation * 0.04 );
    // }
    
    setValuesFrom = () => {
        equation.retiredYears = Number(dateDeath.value - beginningRetirement.value);
        equation.coefficientY = Number(amountMoneyPerYear.value);
        equation.retirementSize = Number(equation.coefficientY) ;
        equation.saveYears = Number(beginningRetirement.value - startOfInvestment.value);
    }
// coefficientX   coefficientX   retirementSize
    calculateCoefficientsInStep = () => {
        equation.coefficientX = equation.coefficientX + ( equation.coefficientX * 0.04 );
        equation.coefficientY = equation.coefficientY + ( equation.coefficientY * 0.04 ) + equation.retirementSize;
    }

    calculateYearlyContribution = () => { // сколько нужно накопить работатет от 2 лет // разбить на функции
        message.innerText = "";

        for (let i = 0; i < equation.retiredYears - 1; i++) {
            calculateCoefficientsInStep();
        }

        equation.requiredAmountMoneyInYear = equation.coefficientY / equation.coefficientX; // на всю жизнь
        
        // calculationOfYearsContribution();
        // console.log(equation.coefficientX, equation.coefficientY, equation.coefficientY / equation.coefficientX);
        
        message.innerText = `${Math.ceil(equation.requiredAmountMoneyInYear)} нужно для жизни на пенсии ${equation.retiredYears} лет`;
        [equation.retiredYears, equation.coefficientY, equation.requiredAmountMoneyInYear, equation.coefficientX] = [null, null, null, 1.04] 
    }

document.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        setValuesFrom();
        calculateYearlyContribution();
    }
})