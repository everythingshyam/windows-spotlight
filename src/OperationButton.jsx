import { ACTIONS } from './App';

export function OperationButton({ dispatch, operation }) {
	return (
		<button
			onClick={() =>
				dispatch({ type: ACTIONS.SYMBOL_CLICK, payload: { operation } })
			}>
			{operation}
		</button>
	);
}
