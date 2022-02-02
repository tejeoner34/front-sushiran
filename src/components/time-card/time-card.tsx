
import { useState } from 'react';
import {  Modal } from 'react-bootstrap';
import {ReservationForm} from '../reservation-form/reservation-form';
import './time-card.scss';

interface Props {
    data: {
        time?: string,
        isAvailable?: boolean
    },
    reservationDate:string,
    reservationNumber:string
}

export const TimeCard: React.FC<Props> = ({ data, reservationDate, reservationNumber }) => {

    //bootstrap modal open and close

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setIsSelected(false)
        setShow(false)
        window.location.reload();
    };
    const handleShow = () => setShow(true);

    const [isSelected, setIsSelected] = useState(false)

    const displayReservationForm = () => {
        setIsSelected(true);
        handleShow();
    }

    return (
        <>
            {
                data.isAvailable ?
                    <div onClick={displayReservationForm} className={isSelected ? 'time-card--selected rounded' : 'time-card rounded'}>
                        <p>{data.time}</p>
                    </div>
                    :
                    <div className='time-card--unvailable rounded'>
                        <p>{data.time}</p>
                    </div>
            }
            <Modal className='d-flex align-items-center'  show={show} onHide={handleClose}>

                <ReservationForm setShow={handleClose} time={data.time} reservationDate={reservationDate} reservationNumber={reservationNumber} ></ReservationForm>

            </Modal>

        </>
    )
}