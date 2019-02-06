class Display {
  constructor(value) {
    this.valueDisplay = document.querySelector('.display_main');
    this.expressionDisplay = document.querySelector('.display_expression');
  }
  get currentValue() {    
    return this.valueDisplay.value;
  }

  set currentValue(value) {
    this.valueDisplay.value = value
  }

  get currentExpression() {        
    return this.expressionDisplay.value;
  }

  set currentExpression(operator) {    
    this.expressionDisplay.value = operator;
  }

  showValue(value) {    
    this.currentValue = value;
    this.currentExpression = '';
    // this.showExpression(value)
  }

  addCharToLine(content) {
    if (this.valueDisplay.value.length < 9) {
      this.valueDisplay.value += content;
    }
    
  }

  showExpression(value) {    
      this.currentExpression += value;
  }
  toggleSignCurrentValue(value) {
    this.showValue(value);
  }

  clearCurrentValue() {
    this.expressionDisplay.value = this.expressionDisplay.value.slice(0, this.expressionDisplay.value.length - this.valueDisplay.value.length)
    this.valueDisplay.value = '';
    
  }

  clearValueDisplay() {
    this.valueDisplay.value = '';
  }

  fullClear() {
    this.valueDisplay.value = '';
    this.expressionDisplay.value = '';
  }

  backspace() {  
    let value = this.currentValue;
    let expression = this.currentExpression;

    // if ( value.length < 1) return false;
    this.currentValue = value.slice(0, value.length - 1);
    this.currentExpression = expression.slice(0, expression.length - 1);
    return true;
  }

  _isNumber(value) {
    console.log(typeof value);
    
    return typeof value === 'number';
  }
} 