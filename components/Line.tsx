import React, { useState } from 'react'
import styles from "./Line.module.css"
import { textVide } from 'text-vide'
import Switch from '@mui/material/Switch'
import {LineType, AnnotationType} from "../data/types"

type LineProps = {
    line: LineType,

    scriptId: string,
    currentUserId: string,

    isHiddenLines: boolean,
    isOptimizedReading: boolean,
    isAnnotationMode: boolean,

    currentUserAnnotation: AnnotationType
    otherUsersAnnotations: AnnotationType[]
    onAddOrUpdateAnnotation: Function,
}

export default function Line(props: LineProps) {
    const [isTextForcedVisible, setIsTextForcedVisible] = useState(false)
    let currentUserAnnotation = props.currentUserAnnotation ?? 
        {
            scriptId: props.scriptId,
            lineId: props.line.id,
            text: "",
            userId: props.currentUserId
        }


    const onAnnotationChange = (e: React.ChangeEvent<HTMLTextAreaElement>, a: AnnotationType) => {
        a.text=e.target.value
        props.onAddOrUpdateAnnotation(a)
    }

    //TODO: Retrieve the type of ther Switch element I imported
    const onRevealerButtonClick = (e: React.ChangeEvent<any>) => {

        setIsTextForcedVisible(e.target.checked)
    }

    const isTextVisible = !props.line.character.isHighlighted || isTextForcedVisible || !props.isHiddenLines


    return (
        <li>

            <div className={props.isAnnotationMode ? styles.annotationShow : styles.annotationHide}>
                {props.otherUsersAnnotations.map((a)=>  {
                    return (
                        <fieldset id={"othersAnnotationFieldset-" + props.line.id} className={styles.othersAnnotation}>
                            <legend>{a.user.displayName}</legend>
                            <textarea
                                className={styles.annotationText}
                                onChange={(event) => {
                                    onAnnotationChange(event, a)
                                }}
                                value={a.text}></textarea>
                        </fieldset>)}
                )}

            <fieldset id={"yourAnnotationFieldset-" + props.line.id} className={styles.yoursAnnotation}>
                <legend >Your notes</legend>
                <textarea
                    className={styles.annotationText}
                    onChange={(event) => {
                        onAnnotationChange(event, currentUserAnnotation)
                    }}
                    value={currentUserAnnotation.text}></textarea>
                    </fieldset>
            </div>
            
    
            <div className={props.line.character.isHighlighted ? styles.highlightedLine : styles.line}>
                <span className={styles.character}>{props.line.character.displayName}</span>
                <span>: </span>
                <span className={props.isHiddenLines && props.line.character.isHighlighted ? styles.revealerShow : styles.revealerHide}>
                    <Switch id={"revealer-" + props.line.id} size="small" onClick={(event) => onRevealerButtonClick(event)} />
                </span>
                <span className={isTextVisible ? styles.textShow : styles.textHide} dangerouslySetInnerHTML={{ __html: props.isOptimizedReading ? textVide(props.line.text) : props.line.text }} />
            </div>
        </li>
    )
}
