export default class Calculation {
    constructor(expression) {
        this.expression = expression;
    }

    /**
     * validate expression string against regex expression
     * (only based on characters: digits, *,+,/,-)
     * @returns bool
     */
    validateInput_basic() {
        const validExpression = /^[0-9.+\-*/\s]+$/; // Regular expression to match valid characters
        console.log("expression is "+ this.expression);
        return validExpression.test(this.expression);
    }

    /**
     * basic evaluation of expression (only based on characters: digits, *,+,/,-)
     * @returns {float} (result) // string
     */
    evaluate_basic() {
        if(!this.validateInput_basic()) return undefined;

        // split into array
        const splitExpression = this.expression.match(/(\d+(\.\d+)?|\*|\/|\+|\-)/g);
        const expressionString = splitExpression.join(" ")

        // Punkt vor Strich
        // find all * or /, evaluate from left to right
        let isError = false;
        for (let index = 0; index < splitExpression.length; index++) {
            const element = splitExpression[index];
        
            if (element === "*" || element === "/") {
                // take neighbours of operator
                const a = parseFloat(splitExpression[index - 1]);
                const b = parseFloat(splitExpression[index + 1]);
            
                if (isNaN(a) || isNaN(b) || !isFinite(a) || !isFinite(b)) {
                    isError = true;
                    break;
                }
            
                let result = this.performOperation(element, a, b);
            
                splitExpression.splice(index - 1, 3, result.toString());
                index -= 2; // adjust index, as b is already processed
            }
        }
        
        // find all + or -, evaluate from left to right
        for (let index = 0; index < splitExpression.length; index++) {
            const element = splitExpression[index];
        
            if (element === "+" || element === "-") {
                const a = parseFloat(splitExpression[index - 1]);
                const b = parseFloat(splitExpression[index + 1]);
        
                if (isNaN(a) || isNaN(b) || !isFinite(a) || !isFinite(b)) {
                    isError = true;
                    break;
                }
            
                let result = this.performOperation(element, a, b);
            
                splitExpression.splice(index - 1, 3, result.toString());
                index -= 2; // adjust index, as b is already processed
            }
      }
    
      if (isError) return undefined;
      return expressionString + " = " + parseFloat(splitExpression[0]);
    }

    /**
     * validate expression string against regex expression
     * (only based on characters: digits, *,+,/,-,(,),^) 
     * @returns {bool}
     */
    validateInput_advanced() {
        const validExpression = /^[0-9.+\-*/\(\)^\s]+$/; // Regular expression to match valid characters
        // console.log("expression is "+ this.expression);
        return validExpression.test(this.expression);
    }

    /**
     * converts infix into postfix notation
     * @param {string} infix 
     * @returns {array} 
     */
    infixToPostfix(){

        // split string into array
        const regex = /(\d+(\.\d+)?|\*|\/|\+|\-|\^|\(|\))/g;
        const splitExpression = this.expression.match(regex);

        if(!splitExpression) return undefined;

        // stack for operators
        const stack = [];
        // queue for numbers
        const queue = [];

        const association = {
            "^" : "right",
            "*" : "left",
            "/" : "left",
            "+" : "left",
            "-" : "left",
        };

        var precedence = {
            "^" : 4,
            "*" : 3,
            "/" : 3,
            "+" : 2,
            "-" : 2,
        };

        splitExpression.forEach(element => {
            // push all digits on queue
            if(element.match(/\d+/)){
                queue.push(element);
            }
            // elseif element is an operator (not a parenthesis)
            else if(element.match(/[\+\*\-\/^]/)){
                // while there's at least one operator on the stack, compare to current operator
                // to determine the order
                let top = stack[stack.length - 1];
                while(top 
                && top.match(/[\+\*\-\/^]/) // no parenthesis
                && ((association[element] === "left" && precedence[element] === precedence[top])
                || (precedence[element] < precedence[top]))){
                    queue.push(stack.pop());
                    top = stack[stack.length - 1];
                }
                stack.push(element);
            }

            // push left parenthesis it onto the stack.
            else if(element === "(") {
                stack.push(element);
            }
            // element is a right parenthesis:
            else if(element === ")") {
                let top = stack[stack.length - 1];
                // while the operator at the top of the operator stack is not a left parenthesis
                while(top && top !== "("){
                    // pop the operator from the operator stack into the output queue
                    queue.push(stack.pop());
                    top = stack[stack.length - 1];
                }
                // assert the operator stack is not empty
                if(!top){
                    console.log("Parentheses mismatch");
                    return undefined;
                }
                if(top === "("){
                    stack.pop(); // Discard left parenthesis
                }
            }
        });

        // After the while loop, pop the remaining items from the operator stack into the output queue.
        while(stack.length !== 0){
            let top = stack[stack.length - 1];
            if(top === "(" || top === ")"){
                console.log("Parentheses mismatch");
                return undefined;
            }
            queue.push(stack.pop());
        }

        return queue;
    };

    /**
     * 
     * @param operator 
     * @param {float} a 
     * @param {float} b 
     * @returns {float} result
     */
    performOperation(operator, a, b) {
        switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        case '^':
            return Math.pow(a, b);
        default:
            throw new Error('Invalid operator: ' + operator);
        }
    }

    evaluatePostfix(postfix) {
        // return if postfix is undefined
        if(!postfix) return undefined;
        // stack for the digits
        const numbers = [];
      
        postfix.forEach(element => {
            if (!isNaN(parseFloat(element)) && isFinite(element)) {
              numbers.push(parseFloat(element));
            } else {
              let b = numbers.pop();
              let a = numbers.pop();
              let result = this.performOperation(element, a, b);
              numbers.push(result);
            }
        });
      
        if(isNaN(numbers[0])) return undefined;
        return numbers[0];
    }

    /**
     * @param {string} expression 
     * @returns {string} parsedExpression 
     */
    parseInput(){
        // split string into array
        const regex = /(\d+(\.\d+)?|\*|\/|\+|\-|\^|\(|\))/g;
        const inputSplitted = this.expression.match(regex);
        return inputSplitted.join(" ");
    }


    /**
     * calls the specified evaluation method
     * @returns float (result of expression)
     */
    calculate() {
        /**
         * @TODO Add your implementation here
         */
        return this.evaluatePostfix(this.infixToPostfix());
    }
}
