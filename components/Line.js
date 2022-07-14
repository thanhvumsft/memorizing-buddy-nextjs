
import React, { useState } from 'react';
import styles from "./Line.module.css";
import { textVide } from 'text-vide';


export default function Line(props) {
    const [isTextForcedVisible, setIsTextForcedVisible] = useState(false);

    const handleRevealerButtonClick = (event) => {
        setIsTextForcedVisible(event.target.checked);
    }

    const isTextVisible = !props.isHighlighted || isTextForcedVisible || !props.hideHighlightedLines;

    return (
        <li>

            <fieldset id={"annotationFieldset-" + props.lineId} className={ props.annotationMode ? styles.annotationShow : styles.annotationHide}>
                <legend for={"annotationFieldset-" + props.lineId}>Annotation</legend>
                <textarea className={styles.annotationText}></textarea>
            </fieldset>
            <div className={props.isHighlighted ? styles.highlightedLine : styles.line}>
                <span className={styles.character}>{props.displayName}</span>
                <span>: </span>
                <span className={props.hideHighlightedLines && props.isHighlighted ? styles.revealerShow : styles.revealerHide}>
                    (<label for={"revealer-" + props.lineId}>
                        👁&nbsp;
                        <input
                            type="checkbox" id={"revealer-" + props.lineId} name={"revealer-" + props.lineId} value={"revealer-" + props.lineId}
                            onClick={(event) => handleRevealerButtonClick(event)} />
                        )&nbsp;
                    </label>
                </span>
                <span className={isTextVisible ? styles.textShow : styles.textHide} dangerouslySetInnerHTML={{ __html: props.optimizeReading ? textVide(props.text) : props.text }} />
            </div>
        </li>
    );
}
