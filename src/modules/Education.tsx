import '../styles/education.scss';
import React, {ForwardedRef} from "react";
import {ReactComponent as MaiLogo} from "../assets/mai-logo.svg";


export const Education = React.forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {

    return (
        <div className={'education-container'} ref={ref}>
            <h1 className={'education-container__header'}>Образование</h1>
            <div className={'education-container__body'}>
                <div className={'education-container__img-wrapper'}>
                    <MaiLogo/>
                </div>
                <div className={'education-container__content'}>
                    <h2 className={'education-name'}>Московский авиационный институт</h2>
                    <p className={'education-period'}>2022 — 2026</p>
                    <div className={'education-faculty'}>
                        <p >Компьютерные науки и прикладная математика</p>
                    </div>
                    <div className={'education-speciality'}>
                        <p >Прикладная математика и информатика (бакалавриат)</p>
                    </div>
                    <hr/>
                    <ul className={'education-courses__list'}>
                        <li>Школа Математического моделирования и IT (2024)</li>
                        <li>ЦК ДПП (Цифровая кафедра "Дополнительная профессиональная подготовка") (2023 - 2024)</li>
                    </ul>
                </div>
            </div>
        </div>
    )
})