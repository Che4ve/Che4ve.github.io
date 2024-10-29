import '../styles/copyButton.scss';
import {ReactComponent as CopySvg} from '../assets/copy.svg';

export interface CopyButtonProps {
    text: string;
}

export const CopyButton = (props: CopyButtonProps) => {

    const handleCopyText = (text: string) => {
        navigator.clipboard.writeText(text);
    }
    return (
        <CopySvg className={'copy-button'} onClick={(e) => {
            handleCopyText(props.text)
        }}/>
    )
}