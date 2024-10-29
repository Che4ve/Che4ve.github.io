import React, {CSSProperties} from 'react';
const Emoji = (props: {label: string, symbol: string, style?: CSSProperties}) => (
    <span
        style={props.style}
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
);
export default Emoji;