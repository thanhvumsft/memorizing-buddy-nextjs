
import React, { useState } from 'react';
import styles from "./DataWidget.module.css";

export default function DataWidget(props) {

    let flattenedListOfLines = [];

    props.script.sections.forEach(section =>
        section.lines.forEach(line => flattenedListOfLines.push({
            section: section.number,
            id: line.id,
            characterId: line.characterId,
            text: line.text
        })));
    

    //TODO HOW CAN I TRANSFORM A LIST INTO NEW OBJECTS BUT KEEP IT AS LIST??
    let charactersSummary = [];

    props.cast.forEach(character => {
        charactersSummary.push(
            {
                id: character.id,
                displayName: character.displayName,
                numberOfLines: getNumberOfLines(character.id),
                numberOfWords: getNumberOfWords(character.id)
            }
        )
    });

    function getNumberOfLines(characterId) {
        let lines = flattenedListOfLines.filter(l=> l.characterId == characterId);
        let number = lines.length;
        return number;
    };
    function getNumberOfWords(characterId) {
        let numberOfWords = 0;
        let lines = flattenedListOfLines.filter(l=> l.characterId == characterId);
        lines.forEach(l=> numberOfWords= numberOfWords + l.text.split(' ').length);
        return numberOfWords;
    };

    const renderDataCharacter = (character) => {
        return (
            <li>{character.displayName}, {character.numberOfLines} lines, {character.numberOfWords} words</li>
        );
    };

    return (
        <div>
            <ul>
                {charactersSummary.map(character => renderDataCharacter(character))}
            </ul>
        </div>
    );
}
