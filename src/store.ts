import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

export type UserId = string;
export type User = {
	id: UserId;
	name: string;
	description: string;
};

const users: User[] = Array.from({ length: 3000 }, (_, index) => ({
	id: `user${index + 11}`,
	name: `User ${index + 11}`,
	description: `Description for User ${index + 11}`,
}));

type UsersState = {
	entities: Record<UserId, User>;
	// дефолтная сортировка, которая приходит с сервера
	ids: UserId[];
	// для выбора юзера и хранения его в redux состоянии
	selectedUserId: UserId | undefined;
};

type CounterState = {
	counter: number;
};

type CountersState = Record<CounterId, CounterState | undefined>;

export type CounterId = string;


export type UserSelectedAction = {
	type: 'userSelected';
	payload: {
		userId: UserId;
	};
};

export type UserRemoveSelectedAction = {
	type: 'userRemoveSelected';
};

export type UsersStoredAction = {
	type: 'usersStored';
	payload: {
		users: User[];
	};
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

type Action =
	| IncrementAction
	| DecrementAction
	| UserSelectedAction
	| UserRemoveSelectedAction
	| UsersStoredAction;

const initialUsersState: UsersState = {
	entities: {},
	ids: [],
	selectedUserId: undefined,
};

const inintialCounterState: CounterState = { counter: 0 };


const inintialCountersState: CountersState = {};

// reducer - принимает предыдущее состояние и action далее возвращает новое состояние

const usersReducer = (
	state = initialUsersState,
	action: Action
): UsersState => {
	switch (action.type) {
		case 'usersStored': {
			const { users } = action.payload;
			return {
				...state,
				entities: users.reduce((acc, user) => {
					acc[user.id] = user;
					return acc;
				}, {} as Record<UserId, User>),
				ids: users.map(user => user.id),
			};
		}

		case 'userSelected': {
			const { userId } = action.payload;
			return {
				...state,
				selectedUserId: userId,
			};
		}

		case 'userRemoveSelected': {
			return {
				...state,
				selectedUserId: undefined,
			};
		}
		default:
			return state;
	}
};

const countersReducer = (
	state = inintialCountersState,
	action: Action
): CountersState => {
	switch (action.type) {
		case 'increment': {
			const { counterId } = action.payload;
			const currentCounter = state[counterId] ?? inintialCounterState;
			return {
				...state,
				[counterId]: {
					...currentCounter,
					counter: currentCounter.counter + 1,
				},
			};
		}
		case 'decrement': {
			const { counterId } = action.payload;
			const currentCounter = state[counterId] ?? inintialCounterState;
			return {
				...state,
				[counterId]: {
					...currentCounter,
					counter: currentCounter.counter - 1,
				},
			};
		}
		default:
			return state;
	}
};


// на каждый кусочек состояния вызывается свой reducer, который может создать новый кусочек, либо обновить

const reducer = combineReducers({
	users: usersReducer,
	counters: countersReducer,
})



export const store = configureStore({
	reducer: reducer,
});

store.dispatch({
	type: 'usersStored',
	payload: { users },
} satisfies UsersStoredAction);

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
