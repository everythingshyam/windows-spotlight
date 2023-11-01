// import logo from './logo.svg';
import './Styles/App.css';
import { useReducer } from 'react';
import { DigitButton } from './Components/DigitButton';
import { OperationButton } from './Components/OperationButton';

export const ACTIONS = {
	DIGIT_CLICK: 'digit-click',
	SYMBOL_CLICK: 'symbol-click',
	CLEAR: 'clear',
	BACKSPACE: 'backspace',
	EVALUATE: 'evaluate',
};

function reducer(state, { type, payload }) {
	let output = '';
	switch (type) {
		case ACTIONS.DIGIT_CLICK:
			output = (state.currentOperand || '') + payload.digit;
			console.log(output);
			if (state.currentOperand === '0' && payload.digit === '0') {
				return state;
			} else if (state.currentOperand === '0' && payload.digit !== '0') {
				return {
					...state,
					currentOperand: payload.digit,
				};
			} else if (
				state.currentOperand &&
				state.currentOperand.includes('.') &&
				payload.digit === '.'
			) {
				return state;
			}
			return {
				...state,
				currentOperand: output,
			};
		case ACTIONS.SYMBOL_CLICK:
			if (state.currentOperand == null || state.currentOperand === '') {
				console.log('clicked again on symbol');
				return {
					...state,
					operation: payload.operation,
				};
			} else if (state.previousOperand) {
				return {
					...state,
					previousOperand: evaluate(state),
					currentOperand: null,
					operation: payload.operation,
				};
			} else {
				return {
					...state,
					previousOperand: state.currentOperand,
					currentOperand: null,
					operation: payload.operation,
				};
			}
		case ACTIONS.CLEAR:
			return {};
		case ACTIONS.BACKSPACE:
			if (state.currentOperand) {
				output = state.currentOperand;
				return {
					...state,
					currentOperand: output.slice(0, -1),
				};
			} else return state;
		case ACTIONS.EVALUATE:
			if (state.previousOperand && state.currentOperand) {
				return {
					...state,
					currentOperand: evaluate(state),
					previousOperand: null,
					operation: null,
				};
			} else return state;
		default: {
			return state;
		}
	}
}

function evaluate({ previousOperand, currentOperand, operation }) {
	const prev = parseFloat(previousOperand);
	const current = parseFloat(currentOperand);
	if (isNaN(prev) || isNaN(current)) return '';
	else {
		let ans = 0.0;
		switch (operation) {
			case '/':
				ans = prev / current;
				break;
			case '*':
				ans = prev * current;
				break;
			case '+':
				ans = prev + current;
				break;
			case '-':
				ans = prev - current;
				break;
			default:
				ans = 0;
		}
		return ans.toFixed(10).toString();
	}
}

function App() {
	const [{ currentOperand, previousOperand, operation }, dispatch] =
		useReducer(reducer, {});

	return (
		<div className='container'>
			<div className='display-bar'>
				<div className='first-operand'>
					{previousOperand}
					{operation}
				</div>
				<div className='second-operand'>{currentOperand}</div>
			</div>
			<button
				value={'AC'}
				className='span-two'
				onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
				AC
			</button>
			<button onClick={() => dispatch({ type: ACTIONS.BACKSPACE })}>
				DEL
			</button>
			<OperationButton
				operation='/'
				dispatch={dispatch}
			/>
			<DigitButton
				digit='1'
				dispatch={dispatch}
			/>
			<DigitButton
				digit='2'
				dispatch={dispatch}
			/>
			<DigitButton
				digit='3'
				dispatch={dispatch}
			/>

			<OperationButton
				operation='*'
				dispatch={dispatch}
			/>

			<DigitButton
				digit='4'
				dispatch={dispatch}
			/>
			<DigitButton
				digit='5'
				dispatch={dispatch}
			/>
			<DigitButton
				digit='6'
				dispatch={dispatch}
			/>
			<OperationButton
				operation='+'
				dispatch={dispatch}
			/>
			<DigitButton
				digit='7'
				dispatch={dispatch}
			/>
			<DigitButton
				digit='8'
				dispatch={dispatch}
			/>
			<DigitButton
				digit='9'
				dispatch={dispatch}
			/>
			<OperationButton
				operation='-'
				dispatch={dispatch}
			/>
			<DigitButton
				digit='.'
				dispatch={dispatch}
			/>
			<DigitButton
				digit='0'
				dispatch={dispatch}
			/>
			<button
				className='span-two'
				onClick={() => {
					dispatch({ type: ACTIONS.EVALUATE });
				}}>
				=
			</button>
		</div>
	);
}

export default App;
