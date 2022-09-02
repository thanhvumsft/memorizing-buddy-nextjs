
import React, { useState } from 'react'
import styles from "./Line.module.css"
import { textVide } from 'text-vide'
import Switch from '@mui/material/Switch'

export default function Line(props) {
    const [isTextForcedVisible, setIsTextForcedVisible] = useState(false)

    const onAnnotationChange = (e) => {
        props.onAddOrUpdateAnnotation(props.currentUser.id, props.id, e.target.value)
    }

    const onRevealerButtonClick = (e) => {
        setIsTextForcedVisible(e.target.checked)
    }

    const isTextVisible = !props.isHighlighted || isTextForcedVisible || !props.hideHighlightedLines

    let getUserdisplayNameFromUserId = (userId) =>{
        let user = props.getUserFromId(userId)
        let displayName = user == null ? "Unknown" : user.displayName
        return displayName
    }

    return (
        <li>

            <div className={props.annotationMode ? styles.annotationShow : styles.annotationHide}>
                {props.otherUsersAnnotations.map((a)=>  {
                    return (
                        <fieldset id={"othersAnnotationFieldset-" + props.id} className={styles.othersAnnotation}>
                            <legend for={"othersAnnotationFieldset-" + props.id}>{getUserdisplayNameFromUserId(a.userId)}</legend>
                            <textarea
                                className={styles.annotationText}
                                onChange={(e) => {
                                    onAnnotationChange(e)
                                }}
                                value={a.text}></textarea>
                        </fieldset>)}
                )}

            <fieldset id={"yourAnnotationFieldset-" + props.id} className={styles.yoursAnnotation}>
                <legend for={"yourAnnotationFieldset-" + props.id}>Your notes ({getUserdisplayNameFromUserId(props.currentUser.id)})</legend>
                <textarea
                    className={styles.annotationText}
                    onChange={(e) => {
                        onAnnotationChange(e)
                    }}
                    value={props.currentUserAnnotation != null ? props.currentUserAnnotation.text : ""}></textarea>
            </fieldset>
            </div>
            
    
            <div className={props.isHighlighted ? styles.highlightedLine : styles.line}>
                <span className={styles.character}>{props.displayName}</span>
                <span>: </span>
                <span className={props.hideHighlightedLines && props.isHighlighted ? styles.revealerShow : styles.revealerHide}>
                    <Switch id={"revealer-" + props.id} size="small" onClick={(event) => onRevealerButtonClick(event)} />
                </span>
                <span className={isTextVisible ? styles.textShow : styles.textHide} dangerouslySetInnerHTML={{ __html: props.optimizeReading ? textVide(props.text) : props.text }} />
            </div>
        </li>
    )
}
