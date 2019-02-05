class Calculator {
  constructor( display, memory ) {
    this.display = display;
    this.memory = memory;
    this.dispatcher = {
      MC: this.memory.memoryClear,
      MR: this.memory.memoryRead,
      MS: this.memory.memorySave
    }
    this._state = {
      operator: false
    }
    this.init();
  }

  getResult() {
    this.memory.getResult(this.display.showValue.bind(this.display));
  }

  isPair(operator) {
    return this.memory.isPair(operator)
  }

  addValueToExpression(operator, done) {
    this.memory.addValueToExpression(operator, done)
  }

  backspace(done) {
    this.memory.backspace(done);
  }

  clearCurrentValue(done) {
    this.memory.removeLastValueInExpression(done);
  } 

  handleMemoryKeysClick({ target }) {
    this.dispatcher[target.className](this.display.getCurrentValue());
  }

  handleSpecialKeysClick({ target }) {
    if ( this._clearKey(target) ) {
      this.clearCurrentValue(this.display.clearCurrentValue.bind(this.display));
      return false
    };
    if ( this._fullClearKey(target) ) {
      this.memory.reset(this.display.fullClear.bind(this.display));
      return false
    };
    if ( this._backspaceKey(target) ) {
      this.memory.backspace(this.display.backspace.bind(this.display))
    };
  }

  handleNumericKeysClick({ target }) {
    if ( this._isKey(target) ) return false;

    if(this._state.operator ) {
      this.display.clearValueDisplay ();
    }
    this._state.operator = false;
    this.display.addCharToLine(target.textContent);
    this.display.showExpression(target.textContent);
  }

  handleOperatorKeysClick({ target }) {
    if ( this._isKey(target) ) return false;
    
    if( !this._state.operator ) {
      this.addValueToExpression(this.display.currentValue);
    } else {
      this.backspace(this.display.backspace.bind(this.display));
    }
    this._toggleState();    

    this.addValueToExpression(
      target.dataset.operator, 
      this.display.showExpression.call(
        this.display, 
        target.textContent
        ));

    if ( !this.isPair(target.dataset.operator) ) {
      this.getResult();
      this._toggleState();
    }
  }

  handleResultKeyClick() {
    this.addValueToExpression(this.display.currentValue, this.display.clearValueDisplay.bind(this.display))
    this.getResult();
  }

  init() {
    const memoryKeys = document.querySelector('.control_memory');
    const numericKeys = document.querySelector('.keypad__number');
    const operatorKeys = document.querySelectorAll('.operators');
    const specialKeys = document.querySelector('.keypad__special');
    const resultKey = document.querySelector('.result_key');
    
    memoryKeys.addEventListener( 'click', this.handleMemoryKeysClick.bind(this));

    specialKeys.addEventListener( 'click', this.handleSpecialKeysClick.bind(this));

    numericKeys.addEventListener( 'click', this.handleNumericKeysClick.bind(this));

    operatorKeys.forEach(operatorKey => operatorKey.addEventListener( 'click', this.handleOperatorKeysClick.bind(this)))

    resultKey.addEventListener( 'click', this.handleResultKeyClick.bind(this));


  }
  _toggleState() {
    this._state.operator = !this._state.operator;
  }

  _isKey(button) {
    return !button.classList.contains('key')
  }
  _clearKey(button) {
    return button.classList.contains('C')
  }
  _fullClearKey(button) {
    return button.classList.contains('CE')
  }
  _backspaceKey(button) {
    return button.classList.contains('backspace')
  }
}