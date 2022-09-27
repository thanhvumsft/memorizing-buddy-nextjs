import React from 'react'
import Line from "./Line"
import { ScriptType, SectionType, LineType, UserType, CharacterType, AnnotationType, UserToCharactersType } from "../data/types"
import { LiveList } from "@liveblocks/client";

type SprintProps = {
    script: ScriptType,
    cast: CharacterType[],
    annotations: LiveList<AnnotationType>,
    users: UserType[],
    currentUserId: string,
    isHiddenLines: boolean,
    isOptimizedReading: boolean,
    isAnnotationMode: boolean
    addOrUpdateAnnotation: Function
}

export default function Script(props: SprintProps) {

    let lineIncrement: number = 0

    const onAddOrUpdateAnnotation = (annotation: AnnotationType) => props.addOrUpdateAnnotation(annotation)

    const renderSections = (scriptId: string, sections: SectionType[]) => {
        return (
            <div>
                {
                    sections.map((section: SectionType) => {
                        return (
                            <div>
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

        let currentCharacter = props.cast.findLast((character) => { return character.id == line.characterId })
        let lineAnnotations = props.annotations.filter((annotation) => annotation.lineId == line.id);
        let currentUserAnnotation = lineAnnotations.findLast((annotation) => annotation.userId == props.currentUserId)
        let otherUsersAnnotations = lineAnnotations.filter((annotation) => annotation.userId != props.currentUserId)

        line.character.displayName = currentCharacter.displayName
        line.character.isHighlighted = currentCharacter.isHighlighted

        return (
            <>
                <Line
                    line={line}

                    currentUserId={props.currentUserId}
                    scriptId={props.script.id}

                    isHiddenLines={props.isHiddenLines}
                    isOptimizedReading={props.isOptimizedReading}
                    isAnnotationMode={props.isAnnotationMode}

                    currentUserAnnotation={currentUserAnnotation}
                    otherUsersAnnotations={otherUsersAnnotations}
                    onAddOrUpdateAnnotation={onAddOrUpdateAnnotation}
                />

            </>
        )
    }

    return (<>
        <div>
            <h2>{props.script.title}</h2>
            <div>{renderSections(props.script.id, props.script.sections.filter(f => f.isDisplayed))}</div>
        </div>
    </>)
}