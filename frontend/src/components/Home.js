import HomeCSS from '../components/modules/Home.module.css';
import { useSelector } from 'react-redux';
import { Navbar } from './navbar';

export const Home = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <>
            <Navbar />
            <div className={HomeCSS.container}>
                <div className={HomeCSS.header}>
                    <h1>Welcome to Our Restaurant</h1>
                    <p>Order delicious food online or manage orders as an employee</p>
                </div>
            </div>
        </>
    );
}
