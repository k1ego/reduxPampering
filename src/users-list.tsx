import { useState, useMemo } from 'react';
import {
	UserId,
	User,
	UserRemoveSelectedAction,
	UserSelectedAction,
	useAppDispatch,
	useAppSelector,
} from './store';

export function UsersList() {
	const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');
	const ids = useAppSelector(state => state.users.ids);
	const entities = useAppSelector((state) => state.users.entities);
	const selectedUserId = useAppSelector(state => state.users.selectedUserId);

	const selectedUser = selectedUserId ? entities[selectedUserId] : undefined;

	const sortedUsers = useMemo(() => ids
	.map(id => entities[id])
	.sort((a, b) => {
		if (sortType === "asc") {
			return a.name.localeCompare(b.name);
		} else {
			return b.name.localeCompare(a.name);
		}
	}),
	[ids, entities, sortType]
);

	

	return (
		<div className='flex flex-col items-center'>
			{!selectedUser ? (
				<div className='flex flex-col items-center justify-between'>
					<div className='flex flex-row items-center'>
						<button
							onClick={() => setSortType('asc')}
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
						>
							Asc
						</button>
						<button
							onClick={() => setSortType('desc')}
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2'
						>
							Desc
						</button>
					</div>
					<ul className='list-none'>
						{sortedUsers.map(user => (
							<UserListItem user={user} key={user.id} />
						))}
					</ul>
				</div>
			) : (
				<SelectedUser user={selectedUser} />
			)}
		</div>
	);
}

// теперь click можно делать через dispatch внутри компонента, значит обращение к store не зависит от иерархии компонетов

function UserListItem({ user }: { user: User }) {
	const dispatch = useAppDispatch();
	const handleUserClick = () => {
		dispatch({
			type: 'userSelected',
			payload: { userId: user.id },
		} satisfies UserSelectedAction);
	};
	return (
		<li key={user.id} className='py-2' onClick={handleUserClick}>
			<span className='hover:underline cursor-pointer'>{user.name}</span>
		</li>
	);
}

function SelectedUser({ user }: { user: User }) {
	const dispatch = useAppDispatch();
	const handleBackButtonClick = () => {
		dispatch({
			type: "userRemoveSelected"
		} satisfies UserRemoveSelectedAction);
	};
	return (
		<div className='flex flex-col items-center'>
			<button
				onClick={handleBackButtonClick}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md'
			>
				Back
			</button>
			<h2 className='text-3xl'>{user.name}</h2>
			<p className='text-xl'>{user.description}</p>
		</div>
	);
}
