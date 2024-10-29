import '../styles/modal.scss';
import {ReactElement, useEffect, useRef, useState} from "react";
import {ReactComponent as CloseIcon} from '../assets/close.svg';

export interface ModalProps {
    id?: string,
    key?: string;
    visible: boolean,
    setVisible: Function,
    title?: ReactElement | string,

    children?: ReactElement[] | ReactElement | string,
}

export const Modal = (props: ModalProps) => {

    const animationDurationOpen : number = 450 // ms
    const animationDurationClose : number = 200 // ms

    const modalRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [modalState, setModalState] = useState<'visible' | 'closing' | ''>('visible');

    useEffect(() => {
        setTimeout(() => {
            document.body.addEventListener('click', handleMouseClick);
        }, animationDurationOpen);
    }, []);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.style.setProperty('--anim-duration-open', `${animationDurationOpen}ms`);
            modalRef.current.style.setProperty('--anim-duration-close', `${animationDurationClose}ms`);
        }
    }, [modalRef.current]);

    useEffect(() => {
        if (modalState === 'closing') {
            setTimeout(() => {
                props.setVisible(false)
            }, animationDurationClose);
            document.body.style.overflow = 'auto';
        }
        if (modalState === 'visible') {
            document.body.style.overflow = 'hidden';
        }
    }, [modalState]);

    const handleMouseClick = (e: MouseEvent) => {
        const {target: eventTarget} = e;
        if (modalRef.current && !modalRef.current.contains(eventTarget as Node)) {
            handleClose();
        }
    }

    const handleClose = () => {
        document.body.removeEventListener('click', handleMouseClick);
        setModalState('closing');
    }

    return (
        <>
            <div className={`modal__wrapper ${modalState}`} ref={wrapperRef}>
            <div className={`modal ${modalState}`} ref={modalRef} id={props.id ?? ''} key={props.key ?? ''}>
                <pre className={`modal__title`}>{props.title}</pre>
                <button className={`modal__close-button`} onClick={handleClose}>
                    <CloseIcon/>
                </button>
                <div className={`modal__content`}>
                    {props.children}
                </div>
            </div>
            </div>
            <div className={`modal__background ${modalState}`}/>
        </>
    )
}