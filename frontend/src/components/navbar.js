import NavbarCSS from '../components/modules/navbar.module.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

export const Navbar = () => {
    
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logout());
    }

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const examUser = useSelector(state => state.auth.user);
    const role = examUser ? examUser.role : ""

    const isEmployee = (role) => {
        return role === "Customer";
    }

    return (
        <div className={NavbarCSS.body}>
            <div>
                <ul className={NavbarCSS.container}>
                    <span className={NavbarCSS.sub_container}>
                        {isAuthenticated && <li><Link to='/home'>Home</Link></li>}
                        {isAuthenticated && <li><Link to='/menu'>Menu</Link></li>}
                        {isAuthenticated && isEmployee(role) && <li><Link to='/orders'>Orders</Link></li>}
                    </span>
                    <span className={NavbarCSS.sub_container}> 
                        {isAuthenticated && <li><Link to='/profile'>Profile</Link></li>}
                        {isAuthenticated && <li className={NavbarCSS.logout} onClick={handleLogout}>Logout</li>}
                        {!isAuthenticated && <li><Link to='/signup'>Signup</Link></li>}
                        {!isAuthenticated && <li><Link to='/login'>Login</Link></li>}
                    </span>
                </ul>
            </div>
        </div>
    )
}
