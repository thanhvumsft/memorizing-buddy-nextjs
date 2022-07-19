
import React, { useState, useEffect } from 'react';
import styles from "./Line.module.css";
import { textVide } from 'text-vide';
import Switch from '@mui/material/Switch';
import { join } from 'path';

export default function Line(props) {

    const [isTextForcedVisible, setIsTextForcedVisible] = useState(false);
    const [otherUsers, setOtherUsers] = useState(props.otherUsers);
    const [draft, setDraft] = useState(props.yourAnnotationText);

    console.log("CONSTRUCTOR");
    console.log(otherUsers);

    const onAnnotationChange = (e) => {
        props.onAddOrUpdateAnnotation(props.currentUserId, props.id, e.target.value);
        setDraft(e.target.value);
    }

    const handleRevealerButtonClick = (e) => {
        setIsTextForcedVisible(e.target.checked);
    }

    const isTextVisible = !props.isHighlighted || isTextForcedVisible || !props.hideHighlightedLines;


    return (
        <li>

            <div className={props.annotationMode ? styles.annotationShow : styles.annotationHide}>
                {props.othersAnnotations.map((a)=>  {
                    let otherUser = otherUsers.find(x=> x.connectionId == a.userId);
                    return (
                        <fieldset id={"othersAnnotationFieldset-" + props.id} className={styles.othersAnnotation}>
                            <legend for={"othersAnnotationFieldset-" + props.id}>{otherUser!=null ? otherUser.info.name : "Unknown"}'s notes</legend>
                            <textarea
                                className={styles.annotationText}
                                onChange={(e) => {
                                    onAnnotationChange(e)
                                }}
                                value={a.text}></textarea>
                        </fieldset>)}
                )}

            <fieldset id={"yourAnnotationFieldset-" + props.id} className={styles.yoursAnnotation}>
                <legend for={"yourAnnotationFieldset-" + props.id}>Your notes</legend>
                <textarea
                    className={styles.annotationText}
                    onChange={(e) => {
                        onAnnotationChange(e)
                    }}
                    value={draft}></textarea>
            </fieldset>
            </div>
            
    
            <div className={props.isHighlighted ? styles.highlightedLine : styles.line}>
                <span className={styles.character}>{props.displayName}</span>
                <span>: </span>
                <span className={props.hideHighlightedLines && props.isHighlighted ? styles.revealerShow : styles.revealerHide}>
                    <Switch id={"revealer-" + props.id} size="small" onClick={(event) => handleRevealerButtonClick(event)} />
                </span>
                <span className={isTextVisible ? styles.textShow : styles.textHide} dangerouslySetInnerHTML={{ __html: props.optimizeReading ? textVide(props.text) : props.text }} />
            </div>
        </li>
    );
}
