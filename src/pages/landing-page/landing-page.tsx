import './landing-page.scss';
import sushi1 from '../../assets/img/sushi-new1.jpg';
import sushi2 from '../../assets/img/sushi-new2.jpg';
import sushi3 from '../../assets/img/sushi-new3.jpg';
import sushiranReservation from '../../assets/img/sushiran-reservation.jpg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRef, useState } from 'react';
import { TimeCard } from '../../components/time-card/time-card';
import { serverFetch } from '../../global-variables/global-variables';
import { Spinner } from 'react-bootstrap';


export default function Landing() {

    //Day and Number of people varibales from reservation from.

    const reservationSectionStyle = {
        backgroundImage: `url(${sushiranReservation})`
    }

    const timeArray = [
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
        '21:30',
        '22:00',
        '22:30',
        '23:00',
        '23:30'
    ];
    const numberClients = [2, 4, 6, 8];

    //State variables

    const [availbaleTimes, setAvailableTimes] = useState([]);
    const [reservationNumber, setReservationNumber] = useState("");
    const [reservationDate, setReservationDate] = useState("");
    const [dataIsRequested, setDataIsRequested] = useState(false);
    const [doWeHaveResponseData, setDoWeHaveResponseData] = useState(false);

    //ref variables

    const timesRef = useRef<HTMLDivElement | null>(null);
    const executeScrollToTimes = () => timesRef.current?.scrollIntoView();
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const executeScrollToLoader = () => loaderRef.current?.scrollIntoView();


    const today = new Date();
    let day = today.getDate()
    let month = today.getMonth() + 1
    let year = today.getFullYear()

    const getDate = function (day: number, month: number, year: number) {
        if (month > 9) {
            return `${year}-${month}-${day}`
        } else {
            return `${year}-0${month}-${day}`
        }
    }

    const handleClick = () =>{
        setDataIsRequested(true);
    }

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            date: { value: string };
            number: { value: string };
            time: { value: string };
        };
        const date = target.date.value;
        const number = target.number.value;
        const time = target.time.value;

        setReservationDate(date);
        setReservationNumber(number);

        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                date: date,
                number: number,
                time: time
            })
        }
        executeScrollToLoader();

        fetch(serverFetch, options)
            .then(r => r.json())
            .then(d => {
                setAvailableTimes(d);
                setDoWeHaveResponseData(true);
                executeScrollToTimes();
            })

    }

    return (
        <div className='home'>
            <div className='home__video-container'>
                <h1>SUSHIRAN RESTAURANT</h1>

                <video className="video" autoPlay muted loop src={process.env.PUBLIC_URL + '/assets/video/sushi.mp4'}>
                </video>
                <div className='video__background'>
                </div>
            </div>
            <div className='home__news-container'>
                <div className='news-container__title'><h2>Discover Everything New</h2></div>
                <div className='news-container__cards'>
                    <div className='news__card'>
                        <div className='card__img-container'>
                            <img src={sushi1} alt="" />
                        </div>
                        <div className='card__info'>
                            <h3>New Flavours</h3>
                            <p>Discover our new special flavours</p>
                        </div>
                    </div>
                    <div className='news__card'>
                        <div className='card__img-container'>
                            <img src={sushi2} alt="" />
                        </div>
                        <div className='card__info'>
                            <h3>How is Sushi made?</h3>
                            <p>Have you ever wondered how sushi is made?</p>
                        </div>
                    </div>
                    <div className='news__card'>
                        <div className='card__img-container'>
                            <img src={sushi3} alt="" />
                        </div>
                        <div className='card__info'>
                            <h3>Check out our restaurants</h3>
                            <p>We are opening new restaurants around the place!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={reservationSectionStyle} className='home__reservation-section'>
                <Form onSubmit={onSubmit} className='reservation-form'>
                    <h3>Make your Reservation</h3>
                    <Form.Group style={{ gap: '1rem' }} className='w-75 d-flex flex-column align-items-center  form__inputs'>
                        <Form.Group style={{ width: '200px' }}>
                            <Form.Label>Choose a date</Form.Label>
                            <Form.Control required min={getDate(day, month, year)} style={{ color: 'black' }} className='bg-secondary text-dark' type='date' name='date' />
                        </Form.Group>
                        <Form.Group style={{ width: '200px' }}>
                            <Form.Label>Number of people</Form.Label>
                            <Form.Select style={{ color: 'black' }} className='bg-secondary' name='number' >
                                {
                                    numberClients.map((client, index) => <option key={index}>{client}</option>)
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group style={{ width: '200px' }}>
                            <Form.Label>Choose a time</Form.Label>
                            <Form.Select required style={{ color: 'black' }} className='bg-secondary' name='time' aria-label="Default select example">
                                {
                                    timeArray.map((time, index) => <option key={index}>{time}</option>)
                                }
                            </Form.Select>
                        </Form.Group>
                        <Button onClick={handleClick} size='lg' type='submit'>Search</Button>
                    </Form.Group>
                </Form>
            </div>
            {
                dataIsRequested &&
                <div style={{ marginBottom: '3rem' }} className='home__available-times d-flex flex-column align-items-center gap-4'>
                    {
                        !doWeHaveResponseData?
                        <div  className='p-3'>
                        <Spinner animation="border"></Spinner>
                        </div>
                        :
                        <div ref={timesRef} className='home__available-times d-flex flex-column align-items-center gap-4'>
                        <h2>Available Times</h2>
                        <div className='d-flex gap-3 flex-wrap justify-content-center'>
                        {availbaleTimes.map((time:object,index:number)=> <TimeCard
                        key={index} data={time} reservationDate={reservationDate} reservationNumber={reservationNumber}/>)}
                        </div>
                        </div>
                    }
                    <div ref={loaderRef}></div>
                </div>
            }
        </div>
    )
}