class Calculator {
  constructor( display, memory ) {
    this._display = display;
    this._memory = memory;
    this.dispatcher = {
      MC: this._memory.memoryClear,
      MR: this._memory.memoryRead,
      MS: this._memory.memorySave
    }
    this._state = {
      operatorIsEnter: false,
      resultIsGet: false
    }
    this._init();
  }

  getResult() {
    let result = this._memory.getResult(this._display.showResult.bind(this._display));
    
    this._display.addCharToExp(result);

    this._state.resultIsGet = true;
    this._memory.reset();
  }

  isPair(operator) {
    return this._memory.isPair(operator)
  }

  addValueToExpression(operator, done) {
    this._memory.addValueToExpression(operator, done)
  }
  backspace() {
    if (this._display.currentMain) {
      this.addValueToExpression(this._display.currentMain, this._display.clearMainDisplay.bind(this._display))
    }
    this._memory.backspace(this._display.backspace.bind(this._display));
  }
  removeLastChar(done) {
    this._memory.removeLastValueInExpression(done);
  }
  clearCurrentValue(done) {
    this._memory.removeLastValueInExpression(this._display.clearMainDisplay.bind(this._display));
    this._display.clearExpressionDisplay();
  } 

  //Обработчики событий
  handleMemoryKeysClick({ target }) {
    this.dispatcher[target.className](this._display.getCurrentValue());
  }
  handleSpecialKeysClick({ target }) {
    if ( this._clearKey(target) ) {
      this.clearCurrentValue();
      return false
    };
    if ( this._fullClearKey(target) ) {
      this._memory.reset(this._display.reset.bind(this._display));
      this._state.operatorIsEnter = false;
      return false
    };
    if ( this._backspaceKey(target) ) {
      this.backspace();
    };
  }
  handleNumericKeysClick({ target }) {
    if ( this._isKey(target) ) return false;
    
    if ( this._state.operatorIsEnter ) {
      this._display.clearMainDisplay();
      this._state.operatorIsEnter = false;
    }

    this._display.addCharToMain(target.textContent);
    this._display.addCharToExp(target.textContent);
    this._state.operatorIsEnter = false;
  }
  handleOperatorKeysClick({ target }) {
    if ( this._isKey(target) ) return false;
  
    if( !this._state.operatorIsEnter) {
      this.addValueToExpression(this._display.currentMain);
    } else {
      this.removeLastChar(this._display.removeLastCharExp.bind(this._display));
    }

    this._state.operatorIsEnter = true;
    this._display.clearMainDisplay();
    this._display.addCharToMain(target.textContent);

    this.addValueToExpression(
      target.dataset.operator, 
      this._display.addCharToExp.call(
        this._display, 
        target.textContent
        ));

    if ( !this.isPair(target.dataset.operator) && this._memory.expression[0] !== '' && this._memory.expression[0] !== "0") {
      this.getResult();
      this._state.operatorIsEnter = true;
    } else if (!this.isPair(target.dataset.operator)) {
      this._display.currentMain = 'div of 0'
    }
    
  }
  handleResultKeyClick() {
    this.addValueToExpression(this._display.currentMain, this._display.clearMainDisplay.bind(this._display))
    this.getResult();
  }

  _init() {
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