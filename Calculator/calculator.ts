import * as readline from 'readline';

function add(num1:number ,num2:number):number{
    return num1 + num2;

}

function subtract(num1:number ,num2:number):number{
   return num1 - num2;

}

function multiply(num1:number ,num2:number):number{
    return num1 * num2;
}

function divide(num1:number ,num2:number):number{
    if (num2 === 0){
        throw new Error("Cannot divide by 0");
    }
    return num1/num2
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(query: string): Promise<string> {
    return new Promise((resolve) => rl.question(query, resolve));
}

function operation(num1: number, num2: number, operator: string): number | undefined {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

const validOperators = ['+','-','*','/'];
(async function main() {
    try {
        console.log("Starting calculator...");
        const num1 = parseFloat(await askQuestion('Enter number 1: '));
        if (isNaN(num1))
            throw new Error('Invalid input for number 1')

        const num2 = parseFloat(await askQuestion('Enter number 2: '));
        if (isNaN(num2))
            throw new Error('Invalid input for number 2')

        const operator = await askQuestion('Enter operator (+|-|*|/): ');
        const ans = operation(num1, num2, operator);

        if (!validOperators.includes(operator)){
            throw new Error('invalid operator')
        }

        if (ans !== undefined) {
            console.log(`The answer is ${ans}`);
        }
    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        rl.close();
    }
})();
