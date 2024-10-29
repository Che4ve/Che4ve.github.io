import '../styles/skills.scss';
import {SkillText} from "../components/SkillText";
import React, {ForwardedRef} from "react";


interface SkillsProps {
    skillsList?: string[];
}

const skillsList = ['React.JS', 'TypeScript', 'JavaScript', 'CSS', 'SCSS', 'Redux Toolkit', 'Git', 'MVC', 'REST API', 'Node.js', 'Jasper Reports', 'C/C++', 'Английский язык - C1'];


export const Skills = React.forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {

    return (
        <div className={'skills-container'} ref={ref}>
            <h1>Навыки</h1>
            <div className={'skills-container__skills'}>
            {skillsList && skillsList.map((skill, index) => {
                return (<SkillText text={skill} key={`skill-${index}`}/>)
            })}
            </div>
        </div>
    )
})