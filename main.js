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

    calculationOfYearsContribution() { // непонятки с годами
        for (let i = 0; i < this.saveYears - 1; i++) {
           this.stepCalculationOfYearsContribution();
        }
      this.amountDeferralYear = Math.ceil(this.requiredAmountMoneyInYear / this.coefficientXForAccumulation);
    },

    stepCalculationOfYearsContribution() { // сколько нужно в месяц
        this.coefficientXForAccumulation += this.coefficientXForAccumulation + ( this.coefficientXForAccumulation * 0.04 );
    },
    
    setValuesFrom() {
        this.retiredYears = dateDeath.value - beginningRetirement.value;
        this.coefficientY = amountMoneyPerYear.value * this.retiredYears; // не та сумма
        this.saveYears = beginningRetirement.value - startOfInvestment.value;
    },

    calculateCoefficientsInStep() { // сколько нужно cчитает год
        this.coefficientX = this.coefficientX + ( this.coefficientX * 0.04 );
        this.coefficientY = this.coefficientY + ( this.coefficientY * 0.04 ) + 100;
    },

    calculateYearlyContribution(){ // сколько нужно накопить работатет от 2 лет
        message.innerText = "";  // разбить на функции

        for (let i = 0; i < this.retiredYears - 1; i++) {
            this.calculateCoefficientsInStep();
        }

        this.requiredAmountMoneyInYear = this.coefficientY / this.coefficientX; // на всю жизнь
        
        this.calculationOfYearsContribution();
        // console.log(this.coefficientX, this.coefficientY, this.coefficientY / this.coefficientX);
        
        message.innerText = `${Math.ceil(this.requiredAmountMoneyInYear)} нужно для жизни на пенсии ${this.retiredYears} лет /n
        откладывая по ${this.amountDeferralYear} в год на протяжении ${this.saveYears}`;
        [this.retiredYears, this.coefficientY, this.requiredAmountMoneyInYear, this.coefficientX] = [null, null, null, 1.04] 
    }
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        equation.setValuesFrom();
        equation.calculateYearlyContribution();
    }
})