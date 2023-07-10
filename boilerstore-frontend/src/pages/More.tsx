import { Link } from 'react-router-dom';
import './More.css';

const NotFound = () => {
	return (
		<div className="More">
			<Link to='/admin/adduser'> Add User Account </Link>
            <Link to='/admin/users'> Edit Users Account </Link>
            <a> Add Asset </a>
            <a> Edit Asset </a>
		</div>
	);
};

export default NotFound;
