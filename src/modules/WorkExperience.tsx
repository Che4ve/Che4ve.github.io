import React, {ForwardedRef, useEffect, useRef, useState} from "react";
import {Timeline} from "../components/Timeline";
import {ReactComponent as GazpromLogo} from "../assets/gazprom-logo.svg";
import {ReactComponent as S7Logo} from "../assets/s7-logo.svg";
import {ReactComponent as MaiLogo} from "../assets/mai-logo.svg";
import '../styles/workExperience.scss'
import {WorkData} from "../models/WorkData";

import GazpromImg from '../assets/img/gazprom.jpeg';
import S7Img from '../assets/img/s7engine.jpeg';
import MAIImg from '../assets/img/it-floor.jpg';

const workData : WorkData[] = [
    {
        id: 1,
        title: "ООО \"Газпром Трансгаз Сургут\"",
        iconElement: <GazpromLogo/>,
        dateStart: "Июнь 2024 г.",
        dateFinish: "Август 2024 г.",

        shortInfo: "Работал в должности Техника (Fullstack-разработчика)",
        stack: "TypeScript, ReactJS, Redux Toolkit, SCSS | Java, Jasper Reports, Oracle DB",
        description: "\tВ рамках импортозамещения в составе команды разрабатывал два автоматизированных рабочих места - веб приложения: ИС \"Полет\" (создание и отслеживание заявок на полеты ВС, документооборот, генерация отчётов и т.д.), ИС \"НИЛ\" (реализовал отслеживание прогресса согласования показателей нормативно-исследовательской лаборатории по филиалам).",
        content: "Достижения:\n" +
            "\t- Написание пользовательского интерфейса на свободных компонентах + компонентах Sencha, что позволило заместить Microsoft Silverlight.\n" +
            "\t- Реализовал веб-страницы планирования годового бюджета, редактирования справочников, а также предоставления отчётов для ИС \"Полет\".\n" +
            "\t- Рефакторинг фронтэнд модулей (в т.ч. перенос старого кода с JS на TS)\n" +
            "\t- Автоматическая генерация отчётов с помощью API JasperReports на Java. Также работа с JasperReports Studio.\n" +
            "\t- Переписал API сервисы так, чтобы они удовлетворяли архитектурному стилю REST.\n" +
            "\t- Реализация \"ручек\" в рамках MVC.\n" +
            "\t- Модификация и развитие API на Java (фреймворк Spring Boot), работа с БД Oracle.\n"
    },
    {
        id: 2,
        title: "\"S7 TechLab\" ⨉ МАИ",
        iconElement: <S7Logo/>,
        dateStart: "Сентябрь 2023 г.",
        dateFinish: "Май 2024 г.",

        shortInfo: "Fullstack-разработка",
        stack: "ReactJS, JavaScript, CSS | Python, PostgreSQL",
        description: "\tВ рамках коллаборации Цифровой Кафедры МАИ и компании S7 TechLab работал в команде над проектом по разработке модели, предсказывающей параметр жизнеспособности двигателя для системы ECM (Engine Condition Monitoring). Данная система нацелена на то, чтобы обеспечить рациональную эксплуатацию двигателя с помощью уменьшения частоты профилактических проверок.",
        content:
            "\t- Реализовал веб-интерфейс, позволяющий выбирать воздушное судно, а также параметры его двигателей, временные рамки и др. Затем, по данному фильтру, выводится предикт в виде графика\n " +
            "\t- Реализация API на фреймворке fastAPI, Python\n " +
            "\t- Работа с БД PostgreSQL: написание SQL-запросов"
    },

]

const index2img = (index?: number) => {
    switch (index) {
        case 0:
            return GazpromImg;
        case 1:
            return S7Img;
        case 2:
            return MAIImg;
        default:
            return '';
    }
}

export const WorkExperience = React.forwardRef((props: any, ref: ForwardedRef<HTMLDivElement>) => {

    const [selectedTimelineIndex, setSelectedTimelineIndex] = useState<number | undefined>(undefined);
    const [img, setImg] = useState('');
    const [imgChanged, setImgChanged] = useState(false);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        handleImgChange(selectedTimelineIndex);
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);  // Clear the previous timeout if it exists
            }
        };
    }, [selectedTimelineIndex]);

    const handleImgChange = (index?: number) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setImgChanged(true);
        timeoutRef.current = setTimeout(() => {
            setImgChanged(false);
            setImg(index2img(index));
        }, 300);
    };

    return (
        <div className={"work-experience"} ref={ref}>
            <h1>Опыт работы</h1>
            <div className={'work-experience__body'}>
                <Timeline workData={workData} setSelectedIndex={setSelectedTimelineIndex} />
                {img && <div className={`img-wrapper ${imgChanged ? 'changed' : ''}`}>
                    <img src={img}/>
                </div>}
            </div>
        </div>
    )
})