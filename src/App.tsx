import { useEffect, useReducer, useRef } from 'react';
import './App.css';
import {
	AppState,
	CounterId,
	DecrementAction,
	IncrementAction,
	store,
} from './store';

function App() {
	return (
		<>
			<Counter counterId='first' />
			<Counter counterId='second' />
		</>
	);
}

// selector - это чистая функция, которая принимает состояние и возвращает его какой то кусочек.
// Важно, что это не должно создавать никаких объектов внутри себя итд
const selectCounter = (state: AppState, counterId: CounterId) =>
	state.counters[counterId];


export function Counter({ counterId }: { counterId: CounterId }) {
	const [, forceUpdate] = useReducer(x => x + 1, 0);

	// нашли последнее значение state
	const lastStateRef = useRef<ReturnType<typeof selectCounter>>()

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			const currentState = selectCounter(store.getState(), counterId);
			const lastState = lastStateRef.current;
			// это работает если только мы имеем дело с иммутабельным состоянием
			// то есть в данном случае проверяем изменение 1 свойства
			if (currentState !== lastState) {
				forceUpdate();
			}

			lastStateRef.current = currentState;
		});

		return unsubscribe;
	}, []);

	const counterState = selectCounter(store.getState(), counterId);
	return (
		<>
			{/* достаем актуальное значение counter */}
			counter {counterState?.counter}
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
