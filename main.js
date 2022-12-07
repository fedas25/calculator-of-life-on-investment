const startOfInvestment = document.getElementById("startOfInvestment");
const beginningRetirement = document.getElementById("beginningRetirement");
const dateDeath = document.getElementById("dateDeath");
const amountMoneyPerYear = document.getElementById("amountMoneyPerYear");
const message = document.getElementById("message");

const equation = {
    coefficientY: null, // 100
    coefficientX: 1.04,  // x в год
    years: null,
    requiredAmountMoney: null,

    setМaluesАrom() {
        this.years = dateDeath.value - beginningRetirement.value;
        this.coefficientY = amountMoneyPerYear.value * this.years; // не та сумма
    },

    calculateCoefficientsInStep() {
        this.coefficientX = this.coefficientX + ( this.coefficientX * 0.04 );
        this.coefficientY = this.coefficientY + ( this.coefficientY * 0.04 ) + 100;
    },

    calculateYearlyContribution(){ // сколько нужно накопить работатет от 2 лет
        message.innerText = "";

        for (let i = 0; i < this.years - 1; i++) {
            this.calculateCoefficientsInStep();
        }
        // console.log(this.coefficientX, this.coefficientY, this.coefficientY / this.coefficientX);
        
        this.requiredAmountMoney = this.coefficientY / this.coefficientX;
        
        message.innerText = `${Math.ceil(this.requiredAmountMoney)} нужно для жизни на пенсии ${this.years} лет`;
        [this.years, this.coefficientY, this.requiredAmountMoney, this.coefficientX] = [null, null, null, 1.04] 
    }
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        equation.setМaluesАrom();
        equation.calculateYearlyContribution();
    }
})