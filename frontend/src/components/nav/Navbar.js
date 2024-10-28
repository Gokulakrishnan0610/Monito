import React, { useEffect } from 'react'
import navData from '../../data/nav'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../../firebase/firebase';
import { useService } from '../../service/ServiceProvider';

const Navbar = () => {
    const { logout } = useService()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false)
    const [admin, setadmin] = useState(true);

    useEffect(() => {


        function authathicata(user) {
            if (user) {
                setLoginStatus(true);
                // if (user.uid === "") {
                //     setadmin(true)
                // }
                // else {
                //     setadmin(false)
                // }
            } else {
                setLoginStatus(false);
            }
        }
        onAuthStateChanged(auth, authathicata)
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className='flex justify-between w-ful sticky bg-white top-0 left-0 right-0 z-50  text-[#003459] items-center gap-6 px-[10px] py-[10px] md:px-[60px] md:py-[20px] '>
            <div className="text-black md:hidden">
                <button onClick={toggleMenu}>
                    {navData.burgerIcon}
                </button>

                {isMenuOpen && (
                    <div className="fixed top-0 left-0 w-2/3 h-full bg-[#003459] p-4 z-50 transition-transform transform translate-x-0">
                        <button onClick={toggleMenu} className="text-white text-xl mb-4">
                            &times;
                        </button>
                        <ul className="space-y-4 text-white">
                            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                            <li><Link to="/category" onClick={toggleMenu}>Category</Link></li>
                            <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
                        </ul>
                    </div>
                )}

            </div>

            <img src={navData.logoImage} alt="" />
            <ul className='items-center justify-between gap-5 font-medium hidden md:flex'>
                {
                    navData.navigator.map((data, index) => (
                        <li className='capitalize' key={index}>
                            <Link to={data.path}>{data.label}</Link>
                        </li>
                    ))
                }
                {admin && (
                    <li>
                        <Link to="/admin">Admin</Link>
                    </li>
                )}
            </ul>

            <div className="search flex  gap-3 items-center ">
                {navData.searchIcon}
                <input type="text" placeholder='Search something here!' className='focus:outline-none border-none px-2 hidden md:flex' />
            </div>
            <div className="btn-group   items-center gap-3 hidden xl:flex capitalize  ">

                <img src={navData.frame} alt="" />
                {
                    loginStatus ?
                        <button className='bg-[#003459] text-white m-0 py-1 px-4 rounded-2xl flex  items-center justify-center ' onClick={logout}>
                            Logout
                        </button> :
                        <button className='bg-[#003459] text-white m-0 py-1 px-4 rounded-2xl flex  items-center justify-center '>
                            <Link to='/login'> join the community</Link>
                        </button>
                }

            </div>


        </nav>
    )
}

export default Navbar