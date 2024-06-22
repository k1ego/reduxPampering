import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import { CounterId, incrementAction, decrementAction, selectCounter } from './counters.slice';

export function Counters() {
	return (
		<div className='flex flex-row items-center justify-center gap-5'>
			<Counter counterId='first' />
			<Counter counterId='second' />
		</div>
	);
}

export function Counter({ counterId }: { counterId: CounterId }) {
	const dispatch = useDispatch();
	const counterState = useAppSelector(state => selectCounter(state, counterId));
	console.log('render counter', counterId);

	

	return (
		<div className='flex flex-row items-center justify-center gap-5 '>
			counter {counterState?.counter}
			<button
				onClick={() => dispatch(incrementAction({ counterId }))}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'

				// селектор вызывается каждый раз, когда меняется что-то в store
				// это происходит чаще, чем ререндерится Counter, компоненты
				// поэтому он должен быть быстрым
				// =============

				// Также AppSelector должен возвращать тот кусок состояния, который нужен компоненту, не более того

				// =============
			>
				increment
			</button>
			<button
				onClick={() => dispatch(decrementAction({ counterId }))}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				decrement
			</button>
		</div>
	);
}
