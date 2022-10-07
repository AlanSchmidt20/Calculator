class Calculator{
     constructor(previousOperandTextElement, currentOperandTextElement) {
         this.previousOperandTextElement = previousOperandTextElement
         this.currentOperandTextElement = currentOperandTextElement
         this.clear()
     } //this constructor will take all the inputs of the claculator as well as all the function of it. By doing this, I set  these two operand inside the class "Calculator"


     clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
     }

     delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
     }

     appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return //if the user enters a "number" = to "." when there is already another "." then it will not allow him because of the "return".
        this.currentOperand = this.currentOperand.toString() + number.toString() //we have to convert it to a string because js would add them if not.
     }//what is gonna happen every time the use clicks on a number. 

     chooseOperation(operation){
        if (this.currentOperand === '') return //this means that if the current operand is empty the return will make sure that the following code will not run
        if (this.previousOperand !== '') {
            this.compute()
        } //this compute function will make sure to make  the operation once the user make another operation.
        this.operation = operation //first we have to set the operation.
        this.previousOperand = this.currentOperand // we r done typing the current number so we recycle that over to this previous operand
        this.currentOperand = '' // and we wanna clear out the new operand so let's say the current opearnd is just going to be equal to an empty string in order to clear up that value.
     }//what is gonna happen every time the user click in any operation.

     compute(){
        let computation //create the variable
        const prev = parseFloat(this.previousOperand)//create a variable of the actual number version of our previous operand. Parse float is used to convert the string into a number. 
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return //this is done to not run the function if the current or the previous are not a number
        switch (this.operation) {
            case '+': 
                computation = prev + current
                break
            case '-': 
                computation = prev - current
                break
            case '*': 
                computation = prev * current
                break    
            case '÷': 
                computation = prev / current
                break
            default:
                return //the default is used whenever any of these cases are not executed, in this case we use return to stop running the function.
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }//is gonna compute the numbers in the calculator.

    getDisplayNumber(number){
        const stringNumber = number.toString()//we create 2 variables in order to split the number, before the decimal point and after the decimal point
        const integerDigits = parseFloat(stringNumber.split('.')[0])//0 because this is before the decimal point.
        const decimalDigits = stringNumber.split('.')[1]// here is 0 because we want to focus on the numbers after the decimal array which is 1
        const floatNumber = parseFloat(number)//this is because our number is actually a string so we have to convert it.
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = '' //if user do not enter nothing or click the decimal point then it will display nothing.
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0}) //but if they enter something then we want to use the local setting and also we want to make sure that we dont have any decimal places after this so we set a maximum fraction digits. 
        }
        if (decimalDigits != null) { //this is when the user did enter a period and has some numbers after it.
            return `${integerDisplay}.${decimalDigits}` //here is the split: the integer part, the "." and the decimal part
        } else {
            return integerDisplay // this is when they dont have a decimal digit. Then it just displays the integer part
        }
        
        //if (isNaN(floatNumber)) return ''
        //return floatNumber.toLocaleString('en') //this is to put the like "1,000". Locale means the local settings of the computer
    } 
    
    updateDisplay(){
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand) //it is done in order to display the first numbers before we click on the opearnd
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` //this is the concatination of both the number and the operation
        }
        else{
            this.previousOperandTextElement.innerText = '' //this is to also clear the previous operand value once we click AC
        }
        //this.previousOperandTextElement.innerText = this.previousOperand//this is done to display what the user click after the operand
        //by doing this, once the user click the operand, the current operand will move up and the previous operand down.
     }//update the values inside our calculator.

}


const numberButtons = document.querySelectorAll('[data-number]') //constant variables for all the different buttoms we have. so we use queryselectorall to select all data-number.
const operationButtons = document.querySelectorAll('[data-operation]') 
const equalsButton = document.querySelector('[data-equals]') 
const deleteButton = document.querySelector('[data-delete]') 
const allClearButton = document.querySelector('[data-all-clear]') 
const previousOperandTextElement = document.querySelector('[data-previous-operand]') 
const currentOperandTextElement = document.querySelector('[data-current-operand]')  

const calculator = new Calculator(previousOperandTextElement,
currentOperandTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})