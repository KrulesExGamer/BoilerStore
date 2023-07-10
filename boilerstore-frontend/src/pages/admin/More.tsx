import { Link } from 'react-router-dom';
import './More.css';

const NotFound = () => {
	return (
		<div className="More">
			<Link to='/admin/adduser'> Add User Account </Link>
            <Link to='/admin/users'> Edit Users Account </Link>
            <Link to={`/admin/edit-asset?asset=new-asset&isNew=true`}> Add Asset </Link>
		</div>
	);
};

export default NotFound;
