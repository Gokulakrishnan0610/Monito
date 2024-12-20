import logo from '../img/navbar/logo.png'
import frame from '../img/navbar/Frame.svg'

const navData = {
    logoImage: logo,
    navigator: [
        { label: 'home', path: '/' },
        { label: 'category', path: '/category' },
        { label: 'contact', path: '/contact' },
    ],
    searchIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>,
    frame: frame,
    burgerIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8" >
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
}

export default navData