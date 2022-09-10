import React from 'react'
import DataWidget from './DataWidget'
import { ScriptType, CharacterType, SectionType, UserToCharactersType } from "../data/types"
import { LiveMap } from "@liveblocks/client";
import { useOthers, useMyPresence } from "../liveblocks.config"

type OptionsProps = {
    script: ScriptType,
    scriptChanged: Function,
    cast: CharacterType[],
    castChanged: Function,
    
    isHiddenLines: boolean,
    isHiddenLinesChanged: Function,
    isOptimizedReading: boolean,
    isOptimizedReadingChanged: Function,
    isAnnotationMode: boolean,
    isAnnotationModeChanged: Function,

    charactersSelectedPerUser: LiveMap<string, UserToCharactersType>,
    generateUserToCharactersUniqueId: Function
}

export default function Options(props: OptionsProps) {
    
    const others = useOthers()
    const [myPresence, updateMyPresence] = useMyPresence()


    const key = props.generateUserToCharactersUniqueId(props.script.id, myPresence.id)
    const currentUsersCharacterIds = props.charactersSelectedPerUser.has(key) ? props.charactersSelectedPerUser.get(key)?.characterIds : []
        
    const onIsHiddenLinesChanged = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => props.isHiddenLinesChanged(event.target.checked)
    const onIsOptimizedReadingChanged = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => props.isOptimizedReadingChanged(event.target.checked)
    const onIsAnnotationModeChanged = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => props.isAnnotationModeChanged(event.target.checked)

    const onHighlightCharacterClick = (event: React.ChangeEvent<HTMLInputElement>, characterId: string) => {
        const newCast = props.cast.slice()
        var castKey = newCast.findIndex((x) => x.id == characterId)
        newCast[castKey].isHighlighted = event.target.checked
        props.castChanged(newCast)
    }
    const onHighlightSectionClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>, sectionNumber: string) => {
        const newSections = props.script.sections.slice()
        var sectionKey = newSections.findIndex((x) => x.number == sectionNumber)
        newSections[sectionKey].isDisplayed = event.target.checked
        const newScript = {...props.script}
        newScript.sections = newSections 
        props.scriptChanged(newScript)
    }

    const renderOptionSection = (section: SectionType) => {
        return (
            <li>
                <input
                    type="checkbox" checked={section.isDisplayed} id={section.number} name={section.number} value={section.number}
                    onClick={(event) => onHighlightSectionClick(event, section.number)} />
                <label for={section.number}>
                    Section {section.number}
                </label>
            </li>
        )
    }

    const renderOptionCharacter = (character: CharacterType) => {
        return (
            <li>
                <input
                    type="checkbox" checked={character.isHighlighted} id={character.id} name={character.id} value={character.id}
                    onClick={(event) => onHighlightCharacterClick(event, character.id)} />
                <label for={character.id}>
                    {character.displayName}
                </label>
            </li>
        )
    }

    return (
        <>
            <fieldset>
                <legend>Script overview</legend>
                <DataWidget
                    script={props.script}
                    cast={props.cast}
                />
            </fieldset>
            <fieldset >
                <legend>What character are you?</legend>
                <ul>
                    {props.cast.map(character => renderOptionCharacter(character))}
                </ul>
            </fieldset>
            <fieldset >
                <legend>What section to display?</legend>
                <ul>
                    {props.script.sections.map(section => renderOptionSection(section))}
                </ul>
            </fieldset>
            <fieldset>
                <legend>Options</legend>
                <ul>
                    <li>
                        <input
                            type="checkbox" checked={props.isHiddenLines} id="hideLines" name="hideLines" value="hide"
                            onClick={(event) => onIsHiddenLinesChanged(event)} />
                        <label for="hideLines">
                            🧑‍🦯 Hide your lines
                        </label>
                    </li>
                    <li>
                        <input
                            type="checkbox" checked={props.isOptimizedReading} id="optimizeForReading" name="optimizeForReading" value="optimizeForReading"
                            onClick={(event) => onIsOptimizedReadingChanged(event)} />
                        <label for="optimizeForReading">
                            👓 Optimize for reading
                        </label>
                    </li>
                    <li>
                        <input
                            type="checkbox" checked={props.isAnnotationMode} id="annotationMode" name="annotationMode" value="annotationMode"
                            onClick={(event) => onIsAnnotationModeChanged(event)} />
                        <label for="annotationMode">
                            📝 Activate annotation mode
                        </label>
                    </li>
                    <li>
                        <button>👤 Practice on your own <i>(Soon!)</i></button>
                    </li>
                    <li>
                        <button>👥 Start a group practice <i>(Soon!)</i></button>
                    </li>
                </ul>
            </fieldset>
        </>
    )
}
