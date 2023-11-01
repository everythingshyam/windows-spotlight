import { ACTIONS } from '../App';

export function DigitButton({ dispatch, digit }) {
	return (
		<button
			onClick={() => {
				console.log('adding', digit);
				dispatch({ type: ACTIONS.DIGIT_CLICK, payload: { digit } });
			}}>
			{digit}
		</button>
	);
}
