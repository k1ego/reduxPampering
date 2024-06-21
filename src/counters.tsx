import { useDispatch } from 'react-redux';
import {
	CounterId,
	DecrementAction,
	IncrementAction,
	selectCounter,
	useAppSelector,
} from './store';

export function Counters() {
	return (
		<div className='flex flex-row items-center justify-center gap-5'>
			<Counter counterId='first' />
			<Counter counterId='second' />
		</div>
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
		<div className='flex flex-row items-center justify-center gap-5 '>
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
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
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
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				decrement
			</button>
		</div>
	);
}
