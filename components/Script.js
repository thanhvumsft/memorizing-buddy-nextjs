import React from 'react'
import Line from "./Line"
import styles from "./Script.module.css"

export default function Script(props) {

    const lineIncrement = 0

    const getUserFromId = (userId) => {
        let userIndex = props.users.findIndex((x, i) => x.id == userId)
        let foundUser = props.users[userIndex]
        return foundUser
    }

    const onAddOrUpdateAnnotation = (userId, lineId, text) => {
        const annotationKey = props.annotations.findIndex((x) => x.userId == userId && x.lineId == lineId)
        if (annotationKey >= 0) {
            props.annotations.set(annotationKey, { lineId: lineId, text: text, userId: userId })
        }
        else {
            props.annotations.push({ lineId: lineId, text: text, userId: userId })
        }
    }

    const renderSections = (scriptId, sections) => {
        return (
            <div>
                {
                    sections.map((section) => {
                        return (
                            <div className={styles.section}>
                                <h3>Section {section.number}</h3>
                                <ul>{section.lines.map((line) => {
                                    const newIncrementValue = lineIncrement
                                    lineIncrement = newIncrementValue + 1
                                    return (
                                        renderLine(scriptId, line)
                                    )
                                }
                                )}</ul>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const renderLine = (scriptId, line) => {

        let lineId = scriptId + "-" + line.id
        let currentCharacter = props.cast.findLast((character) => { return character.id == line.characterId })
        let lineAnnotations = props.annotations.filter((annotation) => annotation.lineId == lineId)
        let currentUserAnnotation = lineAnnotations.findLast((annotation) => annotation.userId == props.user.id)
        let otherUsersAnnotations = lineAnnotations.filter((annotation) => annotation.userId != props.user.id)

        return (
            <Line
                id={lineId}

                characterId={line.characterId}
                displayName={currentCharacter.displayName}
                isHighlighted={currentCharacter.isHighlighted}
                text={line.text}

                currentUser={props.user}
                getUserFromId={getUserFromId}

                hideHighlightedLines={props.isHiddenLines}
                optimizeReading={props.isOptimizedReading}
                annotationMode={props.isAnnotationMode}

                currentUserAnnotation={currentUserAnnotation}
                otherUsersAnnotations={otherUsersAnnotations}
                onAddOrUpdateAnnotation={onAddOrUpdateAnnotation}
            />
        )
    }

    return (<>
        <div className={styles.sectionScript}>
            <h2>{props.script.title}</h2>
            <div>{renderSections(props.script.id, props.script.sections.filter(f => f.isDisplayed))}</div>
        </div>
    </>)
}