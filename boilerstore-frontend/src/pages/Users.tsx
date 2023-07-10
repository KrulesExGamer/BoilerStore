import { useLocation, useNavigate } from 'react-router-dom';
import './Users.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context';
import { UserAccount } from '../utils/types';
import { fetchApi } from '../utils/apiCalls';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../components/IconButton';

const UserSquare = (props: { user: UserAccount }) => {
	return (
		<div className="user-square">
			<h2>{props.user.username}</h2>
			<p>Email: {props.user.email}</p>
			<p>Role: {props.user.role}</p>
			{/* Add more user data as needed */}
			<div className="UserSquare-but-row">
				<button className="UserSquare-but">
					<IconButton icon={faTrash} label="Delete" />
				</button>
				<button className="UserSquare-but">
					<IconButton icon={faEdit} label="Edit" />
				</button>
			</div>
		</div>
	);
};

const UsersPage = () => {
	const [users, setUsers] = useState<UserAccount[]>([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		// Fetch all users when the component mounts
		fetchApi('api/all/users')
			.then((response) => response.content as any as UserAccount[])
			.then((data) => setUsers(data))
			.catch((error) => console.error(error));
	}, []);

	// Filter users based on the search term
	const filteredUsers = users.filter((user) =>
		user.username.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className="users-page">
			<div className="search-bar">
				<input
					type="text"
					placeholder="Search users..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			<div className="users-grid">
				{filteredUsers.map((user) => (
					<UserSquare key={user._id} user={user} />
				))}
			</div>
		</div>
	);
};

const Users = () => {
	const navigate = useNavigate();
	const { userState, setUserState } = useContext(UserContext);

	useEffect(() => {
		if (!userState?.isAdmin) navigate('/not-found');
	}, [userState]);

	return (
		<div className="Users">
			<UsersPage />
		</div>
	);
};

export default Users;
