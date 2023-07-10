import { useLocation, useNavigate } from 'react-router-dom';
import './Users.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context';
import { UserAccount } from '../utils/types';
import { delApi, fetchApi } from '../utils/apiCalls';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../components/IconButton';

const EditUserForm = (props: { username: string }) => {
	const [user, setUser] = useState<UserAccount>({
		username: '',
		password: '',
		email: '',
		role: '',
		firstName: '',
		lastName: '',
		createdAt: '',
	});

	useEffect(() => {
		fetchApi(`api/users/${props.username}`)
			.then((res) => res.content as any as UserAccount)
			.then((data) => setUser(data))
			.catch((err) =>
				console.log('[ERROR] Could not fetch user data.', user),
			);
	}, [props.username]);

	const [formData, setFormData] = useState(structuredClone(user));

	const handleChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		// TODO: Perform form submission or API request to update user data
		console.log(formData);
	};

	return (
		<div className={'edituser-container'}>
			<h2 className="edituser-title">Edit User</h2>
			<form onSubmit={handleSubmit} className="edituser-form">
				<label htmlFor="username" className="edituser-label">
					Username
				</label>
				<input
					type="text"
					id="username"
					name="username"
					value={formData.username}
					onChange={handleChange}
					className="edituser-input"
				/>

				<label htmlFor="email" className="edituser-label">
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className="edituser-input"
				/>

				<label htmlFor="password" className="edituser-label">
					Password
				</label>
				<input
					type="password"
					id="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					className="edituser-input"
				/>

				<label htmlFor="firstName" className="edituser-label">
					First Name
				</label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					value={formData.firstName}
					onChange={handleChange}
					className="edituser-input"
				/>

				<label htmlFor="lastName" className="edituser-label">
					Last Name
				</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					value={formData.lastName}
					onChange={handleChange}
					className="edituser-input"
				/>

				<button type="submit" className="edituser-button">
					Save
				</button>
			</form>
		</div>
	);
};

const UserSquare = (props: {
	user: UserAccount;
	forceReload: () => void;
	setUserToEdit: (username: string) => void;
}) => {
	const del = async () => {
		await delApi(`api/users/${props.user.username}`);
	};

	return (
		<div className="user-square">
			<h2>{props.user.username}</h2>
			<p>Email: {props.user.email}</p>
			<p>Role: {props.user.role}</p>
			{/* Add more user data as needed */}
			<div className="UserSquare-but-row">
				<button
					className="UserSquare-but"
					onClick={async () => {
						await del();
						props.forceReload();
					}}
				>
					<IconButton icon={faTrash} label="Delete" />
				</button>
				<button
					className="UserSquare-but"
					onClick={() => {
						props.setUserToEdit(props.user.username);
					}}
				>
					<IconButton icon={faEdit} label="Edit" />
				</button>
			</div>
		</div>
	);
};

const UsersPage = () => {
	const [users, setUsers] = useState<UserAccount[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [forceReloadFlag, setForceReloadFlag] = useState(0);
	const [userToEdit, setUserToEdit] = useState('');

	const forceReload = () => {
		setForceReloadFlag(forceReloadFlag + 1);
	};

	useEffect(() => {
		// Fetch all users when the component mounts
		fetchApi('api/all/users')
			.then((response) => response.content as any as UserAccount[])
			.then((data) => setUsers(data))
			.catch((error) => console.error(error));
	}, [forceReloadFlag]);

	// Filter users based on the search term
	const filteredUsers = users.filter((user) =>
		user.username.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className="users-page">
			{'' === userToEdit && (
				<>
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
							<UserSquare
								key={user._id}
								user={user}
								forceReload={forceReload}
								setUserToEdit={setUserToEdit}
							/>
						))}
					</div>
				</>
			)}
			{'' !== userToEdit && (
				<>
					<EditUserForm username={userToEdit} />
				</>
			)}
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
