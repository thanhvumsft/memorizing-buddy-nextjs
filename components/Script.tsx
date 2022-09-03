import React from 'react'
import Line from "./Line"
import { ScriptType, SectionType, LineType, UserType, CharacterType, AnnotationType } from "../data/types"
import styles from "./Script.module.css"

type SprintProps = {
    script: ScriptType,
    cast: CharacterType[],
    annotations: AnnotationType[],
    users: UserType[],
    user: UserType,
    isHiddenLines: boolean,
    isOptimizedReading: boolean,
    isAnnotationMode: boolean,
}

export default function Script(props: SprintProps) {

    let lineIncrement: number = 0

    const getUserFromId = (userId: string) => {
        let userIndex = props.users.findIndex((x, i) => x.id == userId)
        let foundUser = props.users[userIndex]
        return foundUser
    }

    const onAddOrUpdateAnnotation = (annotation: AnnotationType) => {
        const annotationKey = props.annotations.findIndex((x) => x.userId == annotation.userId && x.lineId == annotation.lineId)
        if (annotationKey >= 0) {
            props.annotations.set(annotationKey, annotation)
        }
        else {
            props.annotations.push(annotation)
        }
    }

    const renderSections = (scriptId: string, sections: SectionType[]) => {
        return (
            <div>
                {
                    sections.map((section: SectionType) => {
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

    const renderLine = (scriptId: string, line: LineType) => {

        let lineId = scriptId + "-" + line.id
        let currentCharacter: CharacterType = props.cast.findLast((character: CharacterType) => { return character.id == line.characterId })
        let lineAnnotations = props.annotations.filter((annotation: AnnotationType) => annotation.lineId == lineId)
        let currentUserAnnotation = lineAnnotations.findLast((annotation: AnnotationType) => annotation.userId == props.user.id)
        let otherUsersAnnotations = lineAnnotations.filter((annotation: AnnotationType) => annotation.userId != props.user.id)
        
        line.character.displayName = currentCharacter.displayName
        line.character.isHighlighted = currentCharacter.isHighlighted

        return (
            <Line
                line={line}

                currentUser={props.user}
                getUserFromId={getUserFromId}

                isHiddenLines={props.isHiddenLines}
                isOptimizedReading={props.isOptimizedReading}
                isAnnotationMode={props.isAnnotationMode}

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