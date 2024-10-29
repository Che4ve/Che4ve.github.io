import React, {CSSProperties, useCallback, useEffect, useMemo, useState} from 'react';
import '../styles/typewriter.scss';

const useTypewriter = (text: string, speed: number, start: boolean) => {
    const [index, setIndex] = useState(0);
    const displayedText = useMemo(() => text.slice(0, index), [index, text]);
    useEffect(() => {
        if (!start || index >= text.length) {
            return;
        }
        const randSpeed = Math.floor(Math.random() * speed - speed/2);
        const timeoutId = setTimeout(() => {
            setIndex(i => i + 1);
        }, speed + randSpeed);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [index, text, speed, start]);
    return displayedText;
}

const Typewriter = (props: {text: string, speed: number, onFinish?: Function, style?: CSSProperties}) => {



    const [isFinished, setIsFinished] = useState(false);
    const [stopCaret, setStopCaret] = useState(false);
    const [isVisible, setIsVisible] = useState(false);


    let text = useTypewriter(props.text, props.speed, isVisible);

    // HANDLERS

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    entry.target.classList.add('visible');

                } else {
                    setIsVisible(false);
                    entry.target.classList.remove('visible');
                }
            });
        }, {
            root: null,
            rootMargin: '-1% 0px -30% 0px',
            threshold: 0.5,
        });

        document.querySelectorAll('.typewriter').forEach(el => {
            observer.observe(el);
        });

        return () => {
            observer.disconnect();
        };
    }, [])

    useEffect(() => {
        setIsFinished(text.length === props.text.length);
    }, [text]);

    useEffect(() => {
        if (isFinished) {
            if (props.onFinish) {
                props.onFinish();
            }
            setTimeout(() => {
                setStopCaret(true);
            }, 3000)
        }
    }, [isFinished]);

    // -----

    return (
        <div className={`typewriter ${isFinished ? 'finished' : ''} ${isVisible ? 'visible' : ''}`} style={props?.style}>
            <p>
                {text}
            </p>
            <div className={`caret ${stopCaret? 'finished' : ''}`}/>
        </div>
    );
};

export default Typewriter;


