import { useLocation, useNavigate } from 'react-router-dom';
import './Users.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context';
import { UserAccount } from '../utils/types';
import { delApi, fetchApi } from '../utils/apiCalls';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../components/IconButton';


const EditUserForm = (props : { user: UserAccount }) => {
  const [formData, setFormData] = useState(structuredClone(props.user));

  const handleChange = (e : any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    // TODO: Perform form submission or API request to update user data
    console.log(formData);
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};




const UserSquare = (props: { user: UserAccount; forceReload: () => void }) => {
	const del = async () => {
		await delApi(`api/users/${props.user.username}`)
	};

	return (
		<div className="user-square">
			<h2>{props.user.username}</h2>
			<p>Email: {props.user.email}</p>
			<p>Role: {props.user.role}</p>
			{/* Add more user data as needed */}
			<div className="UserSquare-but-row">
				<button
					onClick={async () => {
						await del();
						props.forceReload();
					}}
					className="UserSquare-but"
				>
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
	const [forceReloadFlag, setForceReloadFlag] = useState(0);

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
					/>
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
