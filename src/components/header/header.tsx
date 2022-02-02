import logo from '../../assets/img/sushiranLogo.png';
import './header.scss';

export default function Header(){

    return(
        <header className='header'>
            <div className='header__img-container'>
                <img src={logo} alt="" />
            </div>
            <nav className='header__nav'>
                <ul className='header__nav__list'>
                    <li className='header__nav__list-item'>Reservation</li>
                </ul>
            </nav>
        </header>
    )
}