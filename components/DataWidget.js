
import React, { useState } from 'react';
import styles from "./DataWidget.module.css";

export default function DataWidget(props) {

    let flattenedListOfLines = [];
    let flattenedListOfCharacters = [];

    props.script.sections.forEach(section =>
        section.lines.forEach(line => flattenedListOfLines.push({
            section: section.number,
            id: line.id,
            characterId: line.characterId,
            text: line.text
        })));

    props.cast.forEach(character => {
        let numberOfLines = getNumberOfLinesPerCharacter(character.id);
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
    });
    
    let dataSummary = 
    {
        numberOfSections: props.script.sections.length, 
        numberOfCharacters: flattenedListOfCharacters.length, 
        //TODO WHAT WOULD BE THE BEXT WAY TO GET THAT NUMBER?
        numberOfLines:flattenedListOfCharacters.map(c=> c.numberOfLines).reduce((prev, curr) => prev + curr, 0), 
        numberOfWords:flattenedListOfCharacters.map(c=> c.numberOfWords).reduce((prev, curr) => prev + curr, 0), 
        characters:flattenedListOfCharacters
    };
    

    function getNumberOfLinesPerCharacter(characterId) {
        return flattenedListOfLines.filter(l=> l.characterId == characterId).length;
    };
    function getNumberOfWordsPerCharacter(characterId) {
        return flattenedListOfLines.filter(l=> l.characterId == characterId).map(l=> l.text.split(' ').length).reduce((prev, curr) => prev + curr, 0);
    };

    const renderDataCharacter = (character) => {
        return (
            <li>{character.numberOfLines} for {character.displayName} ({character.numberOfWords} words)</li>
        );
    };

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
    );
}
