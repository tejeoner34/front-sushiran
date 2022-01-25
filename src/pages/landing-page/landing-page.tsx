import './landing-page.scss';
import sushi1 from '../../assets/img/sushi-new1.jpg';
import sushi2 from '../../assets/img/sushi-new2.jpg';
import sushi3 from '../../assets/img/sushi-new3.jpg';

export default function Landing() {


    return (
            <div className='home'>
            <h1>Hello landing</h1>
            <div className='home__video-container'>
                <video className="video" autoPlay muted loop src={process.env.PUBLIC_URL + '/assets/video/sushi.mp4'}>
                </video>
                <div className='video__background'>
                </div>
            </div>
            <div className='home__news-container'>
                <div className='news__card'>
                    <div className='card__img-container'>
                        <img src={sushi1} alt="" />
                    </div>
                    <div className='card__info'>
                        <h3></h3>
                        <p></p>
                    </div>
                </div>
                <div className='news__card'>
                    <div className='card__img-container'>
                        <img src={sushi2} alt="" />
                    </div>
                    <div className='card__info'>
                        <h3></h3>
                        <p></p>
                    </div>
                </div>
                <div className='news__card'>
                    <div className='card__img-container'>
                        <img src={sushi3} alt="" />
                    </div>
                    <div className='card__info'>
                        <h3></h3>
                        <p></p>
                    </div>
                </div>
            </div>
            </div>
    )
}