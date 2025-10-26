import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
    <nav>
        <h2>Notes Keeper</h2>
        <div>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
        </div>
    </nav>
    )
}

export default Navbar;
