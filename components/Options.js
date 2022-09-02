
import React from 'react'
import DataWidget from './DataWidget'

export default function Options(props) {
    
        
    const onHideLinesOptionClick = (event) => props.setIsHiddenLines(event.target.checked)
    const onOptimizeForReadingClick = (event) => props.setIsOptimizedReading(event.target.checked)
    const onAnnotationModeClick = (event) => props.setIsAnnotationMode(event.target.checked)

    const onHighlightCharacterClick = (event, characterId) => {
        const newCast = props.cast.slice()
        var castKey = newCast.findIndex((x) => x.id == characterId)
        newCast[castKey].isHighlighted = event.target.checked
        props.setCast(newCast)
    }
    const onHighlightSectionClick = (event, sectionNumber) => {
        
        const newSections = props.script.sections.slice()
        var sectionKey = newSections.findIndex((x) => x.number == sectionNumber)
        newSections[sectionKey].isDisplayed = event.target.checked
        const newScript = {...props.script}
        newScript.sections = newSections 
        props.setScript(newScript)
    }

    const renderOptionSection = (section) => {
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

    const renderOptionCharacter = (character) => {
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
                            onClick={(event) => onHideLinesOptionClick(event)} />
                        <label for="hideLines">
                            🧑‍🦯 Hide your lines
                        </label>
                    </li>
                    <li>
                        <input
                            type="checkbox" checked={props.isOptimizedReading} id="optimizeForReading" name="optimizeForReading" value="optimizeForReading"
                            onClick={(event) => onOptimizeForReadingClick(event)} />
                        <label for="optimizeForReading">
                            👓 Optimize for reading
                        </label>
                    </li>
                    <li>
                        <input
                            type="checkbox" checked={props.isAnnotationMode} id="annotationMode" name="annotationMode" value="annotationMode"
                            onClick={(event) => onAnnotationModeClick(event)} />
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
