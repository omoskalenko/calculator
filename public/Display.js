class Display {
  constructor(value) {
    this.mainDisplay = document.querySelector('.display_main');
    this.expressionDisplay = document.querySelector('.display_expression');
  }
  get currentMain() {    
    return this.mainDisplay.value;
  }
  set currentMain(value) {
    this.mainDisplay.value = value
  }
  get currentExpression() {        
    return this.expressionDisplay.value;
  }
  set currentExpression(value) {    
    this.expressionDisplay.value = value;
  }
  showResult(result) {    
    this.currentMain = result;
    this.clearExpressionDisplay();
  }
  addCharToMain(content) {
    if (this.mainDisplay.value.length < 9) {
      this.mainDisplay.value += content;
    }    
  }
  addCharToExp(value) {    
      this.currentExpression += value;
      console.log('DISPLAY: Добавлен символ на экран выражения, новое значение', this.currentExpression);
  }
  removeLastCharMain() {
    let value = this.currentMain;
    this.currentMain = value.slice(0, value.length - 1);
    console.log('DISPLAY: удален последний символ на основном экране');
    return true;
  }
  removeLastCharExp() {  
    let value =  this.currentExpression;
    // this.expressionDisplay.value = '';
    this.expressionDisplay.value = value.slice(0, value.length - 1)
    
    console.log(`DISPLAY: удален последний символ на экране выражения, новое значение ${this.currentExpression}`);
    console.log(this.currentExpression);
    
    return true;
  }
  getLastCharExp() {
    let expression = this.currentExpression;
    let lastChar = expression[expression.length - 1];
    return true;
  }
  clearMainDisplay() {
    this.currentMain = '';
  }
  clearExpressionDisplay() {
    this.currentExpression = '';
  }
  //ОБЩИЕ
  reset() {
    this.clearMainDisplay();
    this.clearExpressionDisplay();
  }
  backspace() {  
    this.removeLastCharMain();
    this.removeLastCharExp();
    return true;
  }
  
  _isNumber(value) {
    console.log(typeof value);
    
    return typeof value === 'number';
  }
} 