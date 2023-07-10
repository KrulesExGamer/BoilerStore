import { useLocation, useNavigate } from 'react-router-dom';
import './EditUser.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context';
import { UserAccount } from '../../utils/types';
import { delApi, fetchApi, updateApi } from '../../utils/apiCalls';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../components/IconButton';
import { useParam } from '../../utils/customHooks';
import { Color } from 'three';

const EditUserForm = () => {
	const username = useParam('user');
	const navigate = useNavigate();
	const [updateUser, setUpdateUser] = useState(false);
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
		fetchApi(`api/users/${username}`)
			.then((res) => res.content as any as UserAccount)
			.then((data) => setUser(data))
			.catch((err) =>
				console.log('[ERROR] Could not fetch user data.', user),
			);
	}, [username]);

	useEffect(() => {
		if (!updateUser) return;
		updateApi(`api/users/${username}`, user).then(() =>
			navigate('/admin/users'),
		).catch((err:any) => console.log("[ERROR] Could not update user.", err));
	}, [updateUser]);

	const handleChange = (e: any) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		// TODO: Perform form submission or API request to update user data
		setUpdateUser(true);
	};

	return (
		<div className={'edituser-container'}>
			<h2 className="edituser-title">Edit User</h2>
			<form onSubmit={handleSubmit} className="edituser-form">
				<label htmlFor="username" className="edituser-label">
					username
				</label>
				<input
					type="text"
					id="username"
					name="username"
					value={user.username}
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
					value={user.email}
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
					value={user.password}
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
					value={user.firstName}
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
					value={user.lastName}
					onChange={handleChange}
					className="edituser-input"
				/>

				<div>
					<label className="isadmin-checkbox-label">
						<input
							type="checkbox"
							checked={'admin' === user.role}
							onChange={(e) => {
								handleChange({
									target: {
										name: 'role',
										value: e.target.value
											? 'admin'
											: 'user',
									},
								});
							}}
						/>
						<span className="isadmin-checkbox-custom"></span>
						IsAdmin
					</label>
				</div>

				<button type="submit" className="edituser-button">
					Save
				</button>
			</form>
		</div>
	);
};

export default EditUserForm;
