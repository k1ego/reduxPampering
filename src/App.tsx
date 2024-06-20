import { useDispatch } from 'react-redux';
import './App.css';
import {
	CounterId,
	DecrementAction,
	IncrementAction,
	selectCounter,
	useAppSelector,
} from './store';

function App() {
	return (
		<>
			<Counter counterId='first' />
			<Counter counterId='second' />
		</>
	);
}


export function Counter({ counterId }: { counterId: CounterId }) {
	// dispatch - отправка действия
	const dispatch = useDispatch();

	// селектор вызывается каждый раз, когда меняется что-то в store
	// это происходит чаще, чем ререндерится Counter, компоненты
	// поэтому он должен быть быстрым
	// =============

	// Также AppSelector должен возвращать тот кусок состояния, который нужен компоненту, не более того

	// =============
	const counterState = useAppSelector(state => selectCounter(state, counterId));

	
	return (
		<>
			{/* достаем актуальное значение counter */}
			counter {counterState?.counter}
			{/* ключевое слово "satisfies" говорит о том, что {type: ""} этот литерал соответствует типу IncrementAction*/}
			<button
				onClick={() =>
					dispatch({
						type: 'increment',
						payload: { counterId },
					} satisfies IncrementAction)
				}
			>
				increment
			</button>
			<button
				onClick={() =>
					dispatch({
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
