import '../styles/header.scss'
import Typewriter from "../components/Typewriter";
import React, {CSSProperties, ForwardedRef, useEffect, useState} from "react";
import {getTimeOfDay} from "../utils/getTimeOfDay";
import Emoji from "../components/Emoji";
import {ReactComponent as MySvg} from "../assets/photos/edited2.svg";
import myImage from '../assets/photos/edited1_cutted.png'

const getGreetingText = () => {
    switch (getTimeOfDay()) {
        case 'night':
            return `Доброй ночи!`;
        case 'morning':
            return `Доброе утро!`;
        case 'day':
            return `Добрый день!`;
        case 'evening':
            return `Добрый вечер!`;
        default:
            return `Привет!`;
    }
}

const getEmoji = () => {
    switch (getTimeOfDay()) {
        case 'night':
            return '🌃';
        case 'morning':
            return '🌅';
        case 'day':
            return '🏙️';
        case 'evening':
            return '🌆';
        default:
            return '👋';
    }
}

interface HeaderProps {
    ref?: React.MutableRefObject<HTMLDivElement | null>
}

export const Header = React.forwardRef((props: HeaderProps, ref: ForwardedRef<HTMLDivElement>) => {

    const [typewriterFinished, setTypewriterFinished] = useState(false);
    const [currentHour, setCurrentHour] = useState(new Date().getHours()); // Track only the hour
    const [greeting, setGreeting] = useState({text: 'Привет', emoji: '👋'});

    useEffect(() => {
        // Update the hour every minute
        const timer = setInterval(() => {
            const hour = new Date().getHours();
            setCurrentHour(hour);
        }, 60000);

        setGreeting({text: getGreetingText(), emoji: getEmoji()});
        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        setGreeting({text: getGreetingText(), emoji: getEmoji()});
    }, [currentHour]);

    const handleOnTypewriterFinish = () => {
        setTypewriterFinished(true);
    }

    const handleOnMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const {currentTarget: target} = e;
        const rect = target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        target.style.setProperty('--mouse-x', `${x}px`);
        target.style.setProperty('--mouse-y', `${y}px`);

    }

    return (
        <div className="header" ref={ref} onMouseMove={handleOnMouseMove}>
            <div className={'header__greeting-box'}>
                <div className={`header__title`}>
                    <pre>{'FRONT - END\n'}</pre>
                    <pre>{'WEB-DEVELOPER'}</pre>
                </div>
            </div>
            <div className={`header__photo-frame`}>
                <MySvg className={'my-svg'}/>
                <img className={'photo'} src={myImage}/>
            </div>
        </div>
    )
});