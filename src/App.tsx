import { useEffect, useReducer } from 'react';
import './App.css';
import { CounterId, DecrementAction, IncrementAction, store } from './store';

function App() {
	return (
		<>
			<Counter counterId='first' />
			<Counter counterId='second' />
		</>
	)
}

export function Counter({counterId}: { counterId: CounterId }) {
	const [, forceUpdate] = useReducer(x => x + 1, 0);

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			forceUpdate();
		});

		return unsubscribe;
	}, []);
	return (
		<>
			{/* достаем актуальное значение counter */}
			counter {store.getState().counters[counterId]?.counter}
			{/* ключевое слово "satisfies" говорит о том, что {type: ""} этот литерал соответствует типу IncrementAction*/}
			<button
				onClick={() =>
					store.dispatch({
						type: 'increment',
						payload: { counterId },
					} satisfies IncrementAction)
				}
			>
				increment
			</button>
			<button
				onClick={() =>
					store.dispatch({
						type: 'decrement',
						payload: { counterId },
					} satisfies DecrementAction)
				}
			>
				decrement
			</button>
		</>
	);
}

export default App;
