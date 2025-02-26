import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [prevValue, setPrevValue] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [activeOperator, setActiveOperator] = useState(null);

  const [memory, setMemory] = useState(0);
  const [isScientific, setIsScientific] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [theme, setTheme] = useState('dark'); 

  const themeClasses = {
    dark: 'bg-gray-900 text-white',
    light: 'bg-gray-100 text-gray-900',
    blue: 'bg-blue-900 text-white'
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (!isNaN(key)) {
        isScientific ? appendToDisplay(key) : inputDigit(key);
      } else if (key === '.') {
        isScientific ? appendToDisplay(key) : inputDot();
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        const op = key === '*' ? '×' : key === '/' ? '÷' : key;
        isScientific ? appendToDisplay(op) : performOperation(op);
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleEquals();
      } else if (key === 'Backspace') {
        isScientific
          ? setDisplay(display.slice(0, -1) || '0')
          : clearEntry();
      } else if (key === 'Escape') {
        clearAll();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [display, isScientific, waitingForOperand, activeOperator, equation, prevValue]);

  const clearAll = () => {
    setDisplay('0');
    setEquation('');
    setPrevValue(null);
    setWaitingForOperand(false);
    setActiveOperator(null);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);
    let result;
    const op = activeOperator;
    if (prevValue === null) {
      result = inputValue;
      setPrevValue(result);
      if (nextOperator !== '=') {
        setEquation(`${result} ${nextOperator}`);
      }
    } else if (op) {
      switch (op) {
        case '+':
          result = prevValue + inputValue;
          break;
        case '-':
          result = prevValue - inputValue;
          break;
        case '×':
          result = prevValue * inputValue;
          break;
        case '÷':
          result = prevValue / inputValue;
          break;
        default:
          result = inputValue;
      }
      if (nextOperator === '=') {
        setEquation(`${prevValue} ${op} ${display} =`);
      } else {
        setEquation(`${prevValue} ${op} ${display} ${nextOperator}`);
      }
      setPrevValue(result);
    } else {
      result = inputValue;
    }
    setDisplay(String(result));
    setWaitingForOperand(true);
    setActiveOperator(nextOperator === '=' ? null : nextOperator);
  };

  const handleEquals = () => {
    if (isScientific) {
      try {
        const sanitizedExp = display.replace(/×/g, '*').replace(/÷/g, '/');
        const result = evaluate(sanitizedExp);
        setHistory([...history, `${display} = ${result}`]);
        setDisplay(String(result));
        setWaitingForOperand(true);
      } catch (error) {
        setDisplay('Error');
        setWaitingForOperand(true);
      }
    } else {
      if (activeOperator) {
        performOperation('=');
        setHistory([...history, `${equation} ${display}`]);
      } else {
        setHistory([...history, `${display} = ${display}`]);
      }
    }
  };

  const appendToDisplay = (value) => {
    if (waitingForOperand) {
      setDisplay(String(value));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(value) : display + value);
    }
  };

  const handleAdvancedFunction = (func) => {
    // Append function name with an opening parenthesis
    appendToDisplay(`${func}(`);
  };

  const memoryPlus = () => {
    const currentValue = parseFloat(display);
    setMemory(memory + currentValue);
  };

  const memoryMinus = () => {
    const currentValue = parseFloat(display);
    setMemory(memory - currentValue);
  };

  const memoryRecall = () => {
    setDisplay(String(memory));
    setWaitingForOperand(true);
  };

  const memoryClear = () => {
    setMemory(0);
  };

  const toggleScientific = () => {
    clearAll();
    setIsScientific(!isScientific);
  };

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('blue');
    else setTheme('dark');
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const renderButton = (content, onClick, extraClasses = '', ariaLabel = '') => (
    <button
      onClick={onClick}
      className={`rounded flex items-center justify-center text-base font-medium transition transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full h-full ${extraClasses}`}
      aria-label={ariaLabel || content}
    >
      {content}
    </button>
  );

  // --- Basic Keypad ---
  const basicKeys = [
    ['AC', 'C', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['+/-', '0', '.', '=']
  ];

  const renderBasicKeypad = () => (
    <div className="grid grid-cols-4 gap-1 h-full">
      {basicKeys.flat().map((key) => {
        let handler, colorClasses = '';
        if (key === 'AC' || key === 'C' || key === '%') {
          colorClasses = 'bg-gray-500 text-white hover:bg-gray-600';
        } else if (key === '÷' || key === '×' || key === '-' || key === '+' || key === '=') {
          colorClasses = 'bg-orange-500 text-white hover:bg-orange-600';
        } else {
          colorClasses = 'bg-gray-700 text-white hover:bg-gray-600';
        }

        if (key === 'AC') handler = clearAll;
        else if (key === 'C') handler = clearEntry;
        else if (key === '%') handler = () => performOperation('%');
        else if (key === '÷') handler = () => (isScientific ? appendToDisplay('÷') : performOperation('÷'));
        else if (key === '×') handler = () => (isScientific ? appendToDisplay('×') : performOperation('×'));
        else if (key === '-') handler = () => (isScientific ? appendToDisplay('-') : performOperation('-'));
        else if (key === '+') handler = () => (isScientific ? appendToDisplay('+') : performOperation('+'));
        else if (key === '+/-') handler = () => setDisplay(String(-parseFloat(display)));
        else if (key === '.') handler = () => (isScientific ? appendToDisplay('.') : inputDot());
        else if (key === '=') handler = handleEquals;
        else if (/^\d$/.test(key)) handler = () => (isScientific ? appendToDisplay(key) : inputDigit(key));

        return renderButton(key, handler, colorClasses, key);
      })}
    </div>
  );

  // --- Scientific Section ---
  const scientificKeys = [
    ['(', ')', 'sin', 'cos'],
    ['tan', 'log', '√', '^']
  ];

  const renderScientificSection = () => (
    <div className="grid grid-cols-4 gap-1 h-full">
      {scientificKeys.flat().map((key) => {
        let handler;
        const colorClasses = 'bg-gray-600 text-white hover:bg-gray-700';
        if (key === '(' || key === ')') {
          handler = () => appendToDisplay(key);
        } else if (['sin', 'cos', 'tan', 'log'].includes(key)) {
          handler = () => handleAdvancedFunction(key);
        } else if (key === '√') {
          handler = () => appendToDisplay('sqrt(');
        } else if (key === '^') {
          handler = () => appendToDisplay('^');
        }
        return renderButton(key, handler, colorClasses, key);
      })}
    </div>
  );

  // --- Memory Section ---
  const memoryKeys = ['M+', 'M-', 'MR', 'MC'];
  const renderMemorySection = () => (
    <div className="grid grid-cols-4 gap-1 h-full">
      {memoryKeys.map((key) => {
        let handler;
        const colorClasses = 'bg-green-500 text-white hover:bg-green-600';
        if (key === 'M+') handler = memoryPlus;
        else if (key === 'M-') handler = memoryMinus;
        else if (key === 'MR') handler = memoryRecall;
        else if (key === 'MC') handler = memoryClear;
        return renderButton(key, handler, colorClasses, key);
      })}
    </div>
  );

  return (
    <div className={`${themeClasses[theme]} transition-colors duration-500 w-full h-screen flex flex-col`}>
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4">
        <button onClick={toggleScientific} className="px-3 py-1 border rounded focus:outline-none focus:ring-2" aria-label="Toggle Scientific Mode">
          {isScientific ? 'Standard' : 'Scientific'}
        </button>
        <button onClick={toggleTheme} className="px-3 py-1 border rounded focus:outline-none focus:ring-2" aria-label="Toggle Theme">
          Theme
        </button>
        <button onClick={toggleHistory} className="px-3 py-1 border rounded focus:outline-none focus:ring-2" aria-label="Toggle History">
          History
        </button>
      </div>

      {/* Display Panel */}
      <div className="px-4">
        <div className="text-right text-sm h-6 overflow-hidden">{!isScientific ? equation : ''}</div>
        <div className="text-right text-4xl font-bold h-16 flex items-center justify-end overflow-hidden">{display}</div>
      </div>

      {/* Keypad Area */}
      <div className="flex flex-col h-[50vh] px-4 mt-2 space-y-1">
        {isScientific ? (
          <>
            <div style={{ flex: 2 }} className="w-full">
              {renderScientificSection()}
            </div>
            <div style={{ flex: 1 }} className="w-full">
              {renderMemorySection()}
            </div>
            <div style={{ flex: 5 }} className="w-full">
              {renderBasicKeypad()}
            </div>
          </>
        ) : (
          <div className="w-full h-full">
            {renderBasicKeypad()}
          </div>
        )}
      </div>

      {/* History Slide-Up Panel */}
      <div className={`fixed bottom-0 left-0 right-0 h-64 bg-white text-black shadow-lg transition-transform duration-300 ${showHistory ? 'translate-y-0' : 'translate-y-full'}`} aria-label="Calculation History">
        <div className="p-4 h-full overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">History</h2>
          <ul className="text-sm">
            {history.map((item, index) => (
              <li key={index} className="mb-2 border-b pb-1">{item}</li>
            ))}
          </ul>
          <button onClick={toggleHistory} className="mt-4 px-3 py-1 border rounded focus:outline-none focus:ring-2" aria-label="Close History">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
