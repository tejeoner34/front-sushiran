import logo from '../../assets/img/sushiranLogo.png';
import './header.scss';
import { scroller } from 'react-scroll';

export default function Header(){

    const handleScrollToReservations = () =>{
        scroller.scrollTo("home__reservation-section", {
            duration: 200,
            delay: 0,
            smooth: "easeInOutQuart",
        });
        // scroller.unmount();
    }

    return(
        <header className='header'>
            <div className='header__img-container'>
                <img src={logo} alt="" />
            </div>
            <nav className='header__nav'>
                <ul className='header__nav__list'>
                    <li onClick={handleScrollToReservations} className='header__nav__list-item'>Reservation</li>
                </ul>
            </nav>
        </header>
    )
}