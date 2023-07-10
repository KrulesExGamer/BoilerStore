import { Link } from 'react-router-dom';
import './More.css';

const NotFound = () => {
	return (
		<div className="More">
			<a> Add User Account </a>
            <a> Delete User Account </a>
            <Link to='/admin/users'> Edit Users Account </Link>
            <a> Add Asset </a>
            <a> Delete Asset </a>
            <a> Edit Asset </a>
		</div>
	);
};

export default NotFound;
