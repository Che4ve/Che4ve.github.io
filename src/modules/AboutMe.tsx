import '../styles/aboutMe.scss'
import React, {ForwardedRef, useEffect, useState} from "react";
import Typewriter from "../components/Typewriter";
import {getTimeOfDay} from "../utils/getTimeOfDay";
import Emoji from "../components/Emoji";
import profileImage from '../assets/photos/me.png'
import {Comment} from "../components/Comment";

interface AboutMeProps {
    ref?: React.MutableRefObject<HTMLDivElement | null>
}

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

export const AboutMe = React.forwardRef((props: AboutMeProps, ref: ForwardedRef<HTMLDivElement>) => {
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

    return (
        <div className="about-me" ref={ref}>
            <div className={'about-me__greeting'}>
                <Typewriter text={greeting.text} speed={120} onFinish={handleOnTypewriterFinish}/>
                <Emoji symbol={greeting.emoji} label={greeting.text}
                                               style={{
                                                   opacity: typewriterFinished ? 1 : 0,
                                                   transition: 'opacity 2s ease'
                                               }}
                />
            </div>
            <div className={'about-me__comment-section'}>
                <Comment profileImage={profileImage} name={'Василий Чесноков'} username={'@Che4ve'}
                         content={
                             "Меня зовут Василий - я Frontend-разработчик.\n\n"+
                             "\tС раннего возраста увлекаюсь программированием и постоянно развиваю свои навыки в этой области. Имею опыт разработки веб-приложений в роли Fullstack-разработчика. Однако моя основная страсть — это Frontend, ведь я — творческий человек: так, уже более 10 лет играю на фортепиано."
                         }
                />
                <Comment profileImage={profileImage} name={'Василий Чесноков'} username={'@Che4ve'}
                         content={
                             "\tРаботал с популярными технологиями, такими как TypeScript, ReactJS, в проектах, связанных с импортозамещением и цифровыми решениями.\n"
                             }
                />
                <Comment profileImage={profileImage} name={'Василий Чесноков'} username={'@Che4ve'}
                         content={
                             "\tОтличаюсь креативным подходом к решению задач, быстро обучаюсь новым технологиям и стремлюсь создавать удобные, интуитивные интерфейсы.\n" +
                             "\n" +
                             "\tСтремлюсь к дальнейшему развитию в области Frontend-разработки и готов активно участвовать в интересных проектах, применяя свои навыки для достижения высоких результатов."
                         }
                />
            </div>
        </div>
    )
});