  // MS (Memory Save) - кнопка означает сохранить число, отображенное в данный момент на дисплее калькулятора в память.
  // MR (Memory Read) - кнопка означает считать число из ячейки памяти и вывести его на дисплей.
  // MC (Memory Clear) - кнопка означает стереть данные из ячейки памяти.
  // M+ - прибавить к числу из памяти число, отображенное на дисплее и результат записать в память вместо предыдущего.
  // M- - вычесть из числа в памяти число, отображенное на дисплее калькулятора и результат записать в память.
  // Операции:
// "per" - процент
// "sqr" - квадратный корень
// "exp" - возведение в степень 2
// "rate" - пропорция 1/x
// "div" - Деление
// "mul" - умножение
// "sub" - вычитание
// "add" - сложение
// "total"  - Равнo

  class Memory {
    constructor() {
      this.savedValues = [];
      this._expression = [];
      this.result = 0;
      this.operators = {
        'mul': {
          pair: true,
          func: function(a, b) {
            return +a * +b;
          }
        },
        'add': {
          pair: true,
          func: function(a, b) {
            return +a + +b;
          }
        },
        'div': {
          pair: true,
          func: function(a, b) {
            return +a / +b;
          }
        },
        'sub': {
          pair: true,
          func: function(a, b) {
            return a - b;
          }
        },
        'per': {
          pair: false,
          func: function(a) {
            return a / 100;
          }
        },
        'sqr': {
          pair: false,
          func: function(a) {
            return Math.sqrt(a);
          }
        },
        "rate": {
          pair: false,
          func: function(a) {
            return 1 / a;
          }
        },
        "exp": {
          pair: false,
          func: function(a) {
            return a * a;
          }
        }
      }
      this.priorityOperations = ['mul',"div"]
      
    }
    isPair(operator) {
      return this.operators[operator].pair;
    }

    //МЕТОДЫ ДЛЯ РАБОТЫ С ПАМЯТЬЮ
    // MS (Memory Save) - кнопка означает сохранить число, отображенное в данный момент на дисплее калькулятора в память. 
    memorySave(value, done) {
      this.savedValues.push(value);
      if(done) done();
      return this.savedValues;
    }
    // M+ - прибавить к числу из памяти число, отображенное на дисплее и результат записать в память вместо предыдущего.
    memoryPlus(value, done) {

    }
    // M- - вычесть из числа в памяти число, отображенное на дисплее калькулятора и результат записать в память.
    memoryMinus(value, done) {

    }
    // MR (Memory Read) - кнопка означает считать число из ячейки памяти и вывести его на дисплей.
    memoryRead(value, done) {
      return this.savedValues[this.savedValues.length - 1];
    }
    // MC (Memory Clear) - кнопка означает стереть данные из ячейки памяти.
    memoryClear(value, done) {
      this.savedValues = [];
    }

    //МЕТОДЫ ДЛЯ РАБОТЫ С ВЫРАЖЕНИЕМ
    addValueToExpression(value, done) {      
      this.expression.push(value);
      if (done) done();
      console.log(`".addValueToExpression": Добавленно значение ${value} в выражение: ${this.expression.join('')}` )
      return this.expression;
    }

    get expression() {
      return this._expression;
    }

    set expression(value) {
      this._expression = value;
      console.log(`".expression": установлено новое значение выражения ${this.expression}`);
    }

    getResult(done) {
      console.log('".getResult": Производится вычисление выражения',this.expression);

      this.result  = this.calculate(this.expression, 0);
      if (this.result === 'Infinity') {
        this.result = 'div of 0'
      }
      
      if( done ) done(this.result); 

      console.log(`".getResult": вычисление выражения  ${this.expression.join('')} произведено, результат: ${this.result}`);
      return this.result;
      // this.reset();
    }

    calculate(expression, indexOperator) {
      console.log('".calculate": получено выражение',this.expression);


      let result = null;
      let resultPriorityOperations = null;
      let indexPriorityOperations = expression.indexOf(this.priorityOperations[indexOperator])     

      if( expression.length < 2) {
        result = expression[0];
        return result.toFixed( this.calcFixed(result) );
      }

      if(indexPriorityOperations === -1) {
        indexOperator += 1;
      }

      if( this.priorityOperations[indexOperator] === undefined ) {
        console.log('Приоритетных операций нет. Начать последовательное вычисление');
        result = this.operators[expression[1]].func(+expression[0], +expression[2])
        expression.splice(0, 3, result);
        console.log(`Промежуточное выражение: ${expression}`);
        
      }
      
      if(indexPriorityOperations > -1) {
        console.log(`Выполнение приоритетной операции "${this.priorityOperations[indexOperator]}"`);
        
        resultPriorityOperations = this.operators[expression[indexPriorityOperations]].func(+expression[indexPriorityOperations - 1], +expression[indexPriorityOperations + 1]);

        expression.splice(indexPriorityOperations - 1, 3, resultPriorityOperations);
        console.log(`Промежуточное выражение: ${expression}`);
      }       
      return this.calculate(expression, indexOperator);
    }

    removeLastValueInExpression(done) {
      this.expression = this.expression.slice(0, this.expression.length - 1);
      if (done) done();
      console.log('".removeLastValueInExpression": удалено последнее введенное значение',this.expression);

    }

    backspace(done) {
      // this.expression = this.expression.slice(0, this.expression.length - 1 );
      this.removeLastValueInExpression();
      if (done) done();
      console.log('".backspace": Удален введенный символ с экрана, если это оператор то удален оператор из выражения', this.expression);
    }

    reset(done) {
      this.savedValues = [];
      this.expression = [];
      this.result = 0;
      this.operators.entered = [];
      if (done) done();
      console.log('".reset":Сброшено',this.expression);
    }

    calcFixed(result) {
      let round = Math.round(result);
      if(result.toString().length === round.toString().length) {
        return 0;
      }
      let fixedLength = 10 - round.toString().length;
      return fixedLength;
    }
  }
