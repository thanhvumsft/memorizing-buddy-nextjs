
import React, { useState } from 'react';
import styles from "./Line.module.css";

export default function Line(props) {
    const [isTextVisible, setIsTextVisible] = useState(true);
    
    const handleRevealerButtonClick = (event) => { setIsTextVisible(event.target.value) }

    return (
        <li className={props.isHighlighted ? styles.highlightedLine : styles.line }>
            <span className={styles.character}>{props.displayName}</span>
            <span>: </span>

             <span className={props.hideHighlightedLines && props.isHighlighted ? styles.revealerShow : styles.revealerHide}>
                (<label for={"revealer-"+props.lineId}>
                    👁&nbsp;
                <input
                    type="checkbox" id={"revealer-"+props.lineId} name={"revealer-"+props.lineId} value={"revealer-"+props.lineId}
                    onClick={(event) => handleRevealerButtonClick(event)} />
                    )&nbsp;
                </label>
            </span> 

            {/* <span className={!props.hideHighlightedLines || (props.hideHighlightedLines && !props.isHighlighted) ?  styles.textShow : styles.textHide} > */}
            <span className={isTextVisible ?  styles.textShow : styles.textHide} >
                {isTextVisible} -  {props.text}
            </span>
        </li>
    );
}
