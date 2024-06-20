import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

type CounterState = {
	counter: number;
};

export type CounterId = string;

type State = {
	counters: Record<CounterId, CounterState | undefined>;
};

export type IncrementAction = {
	type: 'increment';
	payload: {
		counterId: CounterId;
	};
};

export type DecrementAction = {
	type: 'decrement';
	payload: {
		counterId: CounterId;
	};
};

type Action = IncrementAction | DecrementAction;

const inintialCounterState: CounterState = { counter: 0 };

const initialState: State = {
	counters: {},
};

// reducer - принимает предыдущее состояние и action далее возвращает новое состояние

const reducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case 'increment': {
			const { counterId } = action.payload;
			const currentCounter = state.counters[counterId] ?? inintialCounterState;
			return {
				...state,
				counters: {
					...state.counters,
					[counterId]: {
						...currentCounter,
						counter: currentCounter.counter + 1,
					},
				},
			};
		}
		case 'decrement': {
			const { counterId } = action.payload;
			const currentCounter = state.counters[counterId] ?? inintialCounterState;
			return {
				...state,
				counters: {
					...state.counters,
					[counterId]: {
						...currentCounter,
						counter: currentCounter.counter - 1,
					},
				},
			};
		}
		default:
			return state;
	}
};

export const store = configureStore({
	reducer: reducer,
});

// selector - это чистая функция, которая принимает состояние и возвращает его какой то кусочек.
// Важно, что это не должно создавать никаких объектов внутри себя итд
export const selectCounter = (state: AppState, counterId: CounterId) =>
	state.counters[counterId];

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// вызываем в useSelector withTypes, который возвращает версию
// useSelector уже типизированную нашим AppState
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
