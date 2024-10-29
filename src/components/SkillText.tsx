import '../styles/skillText.scss';

export interface SkillTextProps {
    text: string;
    level?: 1 | 2 | 3 // 3 is cool

}

export const SkillText = (props: SkillTextProps) => {

    return (
        <div className={'skill-container'}>
            <p className={'skill-container__text'}>{props.text}</p>
        </div>
    )
}