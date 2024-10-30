import '../styles/sideMenu.scss'
import React, {useState, useEffect, ReactNode, ReactElement, useContext, useRef} from "react";
import {ReactComponent as MenuIcon} from '../assets/menu-options.svg';
import {ReactComponent as BackIcon} from '../assets/options-back.svg';
import {ReactComponent as CaseIcon} from '../assets/sideMenu/case.svg';
import {ReactComponent as GraduationIcon} from '../assets/sideMenu/graduation-cap.svg';
import {ReactComponent as HomeIcon} from '../assets/sideMenu/home.svg';
import {ReactComponent as ProfileIcon} from '../assets/sideMenu/profile.svg';
import {ReactComponent as SkillIcon} from '../assets/sideMenu/skill.svg';
import {ScrollContext} from "../App";


interface MenuOption {
    label: string,
    value?: string | ReactElement,
    url?: string,
}

const menuOptions: MenuOption[] = [
    {label: "В начало", value: (<HomeIcon/>)},
    {label: "Обо мне", value: (<ProfileIcon/>)},
    {label: "Опыт работы", value: (<CaseIcon/>)},
    {label: "Образование", value: (<GraduationIcon/>)},
    {label: "Навыки", value: (<SkillIcon/>)},
]

export const SideMenu = () => {

    const refs = useContext(ScrollContext);

    // STATES
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);

    // -----

    // EFFECTS
    useEffect(() => {
        if (visible) {
            document.body.addEventListener('click', handleMouseClick);
            setTimeout(() => {

            })
        } else {
            document.body.removeEventListener('click', handleMouseClick);
        }
    }, [visible]);
    // -----

    // HANDLERS
    const handleOpen = () => {
        visible ? setVisible(false) : setVisible(true);
    }

    const handleClose = () => {
        setVisible(false);
    }

    const handleMouseClick = (e: MouseEvent) => {
        const {target: eventTarget} = e;
        if (ref.current && !ref?.current?.contains(eventTarget as Node)) {
            handleClose();
        }
    }

    const handleElementClick = (option: MenuOption, index: number) => {
        setClickedIndex(index)
        setTimeout(() => {
            setClickedIndex(null);
        }, 200)

        handleScrollToTarget(option)
    }

    const handleScrollToTarget = (option: MenuOption) => {
        console.log(option.label)
        switch (option.label) {
            case "В начало":
                refs?.headerRef?.current?.scrollIntoView({behavior: "smooth"});
                break;
            case "Обо мне":
                refs?.aboutMeRef?.current?.scrollIntoView({behavior: "smooth"});
                break;
            case "Опыт работы":
                refs?.workExperienceRef?.current?.scrollIntoView({behavior: "smooth"});
                break;
            case "Образование":
                refs?.educationRef?.current?.scrollIntoView({behavior: "smooth"});
                break;
            case "Навыки":
                refs?.skillsRef?.current?.scrollIntoView({behavior: "smooth"});
                break;
            default:
                break;
        }
    }
    // -----

    return (
        <div className={`side-menu ${visible ? "expanded" : "collapsed"}`} ref={ref}>
            <button className={`side-menu-opener ${visible ? "expanded" : "collapsed"}`} onClick={handleOpen}>
                <MenuIcon className="menu-icon" />
                <BackIcon className="back-icon" />
            </button>
            <div className={`side-menu-content ${visible ? "expanded" : "collapsed"}`}>
                {menuOptions.map((option: MenuOption, index) => {
                    return (
                        <div className={`content-element #${index} ${visible ? "expanded" : "collapsed"} ${index === clickedIndex ? 'animate' : ''}`}
                             onClick={() => handleElementClick(option, index)} key={`content-element-${index}`}>
                            {option.value}
                            <a>{option.label}</a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}