
import React from 'react'
import { ScriptType, CharacterType } from "../data/types"

type DataWidgetProps = {
    script: ScriptType,
    cast: CharacterType[]
}

type FlattenedLine = {
    section: string,
    id: string,
    characterId: string,
    text: string
}

type FlattenedCharacter = {
    id: string,
    displayName: string,
    numberOfLines: number,
    numberOfWords: number
}

type DataSummary = {
    numberOfSections: number, 
    numberOfCharacters: number, 
    //TODO WHAT WOULD BE THE BEXT WAY TO GET THAT NUMBER?
    numberOfLines: number, 
    numberOfWords:number, 
    characters:FlattenedCharacter[]
}

export default function DataWidget(props: DataWidgetProps) {
    let sections = props.script.sections.filter(s=>s.isDisplayed)
    let flattenedListOfLines: FlattenedLine[] = []
    let flattenedListOfCharacters: FlattenedCharacter[] = []

    sections.forEach(section =>
        section.lines.forEach(line => flattenedListOfLines.push({
            section: section.number,
            id: line.id,
            characterId: line.characterId,
            text: line.text
        })))

    props.cast.forEach(character => {
        let numberOfLines = getNumberOfLinesPerCharacter(character.id)
        if(numberOfLines>0)
        {
            flattenedListOfCharacters.push(
                {
                    id: character.id,
                    displayName: character.displayName,
                    numberOfLines: getNumberOfLinesPerCharacter(character.id),
                    numberOfWords: getNumberOfWordsPerCharacter(character.id)
                }
            )
        }
    })
    
    let dataSummary: DataSummary = 
    {
        numberOfSections: sections.length, 
        numberOfCharacters: flattenedListOfCharacters.length, 
        //TODO WHAT WOULD BE THE BEXT WAY TO GET THAT NUMBER?
        numberOfLines:flattenedListOfCharacters.map(c=> c.numberOfLines).reduce((prev, curr) => prev + curr, 0), 
        numberOfWords:flattenedListOfCharacters.map(c=> c.numberOfWords).reduce((prev, curr) => prev + curr, 0), 
        characters: flattenedListOfCharacters
    }
    

    function getNumberOfLinesPerCharacter(characterId: string) {
        return flattenedListOfLines.filter(l=> l.characterId == characterId).length
    }
    function getNumberOfWordsPerCharacter(characterId: string) {
        return flattenedListOfLines.filter(l=> l.characterId == characterId).map(l=> l.text.split(' ').length).reduce((prev, curr) => prev + curr, 0)
    }

    const renderDataCharacter = (character: FlattenedCharacter) => {
        return (
            <li>{character.numberOfLines} for {character.displayName} ({character.numberOfWords} words)</li>
        )
    }

    return (
        <div>
            <ul>
                <li>{dataSummary.numberOfSections} sections</li>
                <li>{dataSummary.numberOfCharacters} characters</li>
                <li>{dataSummary.numberOfLines} lines and {dataSummary.numberOfWords} words</li>
                <li>
                    <ul>
                        {dataSummary.characters.sort().map(character => renderDataCharacter(character))}
                    </ul>
                </li>
            </ul>
        </div>
    )
}
