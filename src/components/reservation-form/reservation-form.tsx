import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MdRestaurant } from "react-icons/md";
import { MdInsertInvitation } from "react-icons/md";
import { BiTime } from "react-icons/bi";
import { serverFetch } from '../../global-variables/global-variables';
import { useState } from 'react';

interface Props {
    time: string | undefined,
    reservationDate: string,
    reservationNumber: string,
    setShow:Function
}

export const ReservationForm: React.FC<Props> = ({ time, reservationNumber, reservationDate, setShow }) => {

    const [isReserved, setIsReserved] = useState(false)

    const handleReservationSubmit = (e: React.SyntheticEvent) => {

        e.preventDefault();

        const target = e.target as typeof e.target & {
            email: { value: string }
        };
        const email = target.email.value;

        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                date: reservationDate,
                people: reservationNumber,
                time: time,
                email
            })
        };

        fetch(`${serverFetch}/reserve`, options)
            .then(r => r.json())
            .then(d => {
                if(d==='ok')setIsReserved(true)
            })
    }

    return (
        <>
            {
                isReserved ?
                    <div style={{ color: 'black', maxWidth: '500px', gap: '1rem' }}
                        className='bg-secondaryd-flex d-flex flex-column justify-content-center align-items-center rounded p-3'>
                        <h2>Thanks for your reservation!</h2>
                        <p>We have sent you an email with the reservation details.</p>
                        <Button onClick={()=>setShow()}>Close</Button>
                    </div>
                    :
                    <div style={{ color: 'black', maxWidth: '500px', gap: '1rem' }}
                        className='bg-secondaryd-flex d-flex flex-column justify-content-center align-items-center rounded p-3'>
                        <h2>Your reservation</h2>
                        <div className='d-flex align-items-center gap-2'>
                            <MdRestaurant />
                            <p className='mt-0 mb-0'>Group of <b>{reservationNumber}</b></p>
                        </div>
                        <div className='d-flex align-items-center gap-2'>
                            <MdInsertInvitation />
                            <p className='mt-0 mb-0'>Date: <b>{reservationDate}</b></p>
                        </div>
                        <div className='d-flex align-items-center gap-2'>
                            <BiTime />
                            <p className='mt-0 mb-0'>Time: <b>{time}</b></p>
                        </div>
                        <Form onSubmit={handleReservationSubmit} className='d-flex flex-column align-items-center justify-content-center gap-3' style={{ maxWidth: '300px' }}>
                            <Form.Group className='w-100 d-flex flex-column align-items-center gap-2'>
                                <Form.Label>Type your email and you will receive a confirmation email</Form.Label>
                                <Form.Control style={{ color: 'black' }} placeholder='email' name='email' className='bg-secondary' required type='email'></Form.Control>
                                <Button type='submit'>RESERVE</Button>
                            </Form.Group>
                        </Form>
                    </div>
            }
        </>
    )
}