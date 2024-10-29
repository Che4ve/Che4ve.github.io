import './App.scss';
import React, {createContext, MutableRefObject, useRef} from "react";
import {SideMenu} from "./components/SideMenu";
import {Header} from "./modules/Header";
import {AboutMe} from "./modules/AboutMe";
import {ChatAI} from "./components/ChatAI";
import './utils/intersectionObserver'
import {WorkExperience} from "./modules/WorkExperience";
import {Contacts} from "./components/Contacts";
import {SkillText} from "./components/SkillText";
import {Skills} from "./modules/Skills";
import {Education} from "./modules/Education";


interface ScrollRefs {
    headerRef?: MutableRefObject<HTMLDivElement | null>;
    aboutMeRef?: MutableRefObject<HTMLDivElement | null>;
    workExperienceRef?: MutableRefObject<HTMLDivElement | null>;
    educationRef?: MutableRefObject<HTMLDivElement | null>;
    skillsRef?: MutableRefObject<HTMLDivElement | null>;
}

const defaultRefs : ScrollRefs = {}

export const ScrollContext = createContext<ScrollRefs>(defaultRefs);



export const App : React.FC = () => {

    const refs : ScrollRefs = {
        headerRef: useRef(null),
        aboutMeRef: useRef(null),
        workExperienceRef: useRef(null),
        educationRef: useRef(null),
        skillsRef: useRef(null),
    }

    return (
        <ScrollContext.Provider value={refs}>
            <div className="App">
                <SideMenu/>
                <Contacts/>

                <Header ref={refs.headerRef}/>
                <AboutMe ref={refs.aboutMeRef}/>
                <WorkExperience ref={refs.workExperienceRef}/>
                <Education ref={refs.educationRef}/>
                <Skills ref={refs.skillsRef}/>
            </div>
        </ScrollContext.Provider>
    );
}