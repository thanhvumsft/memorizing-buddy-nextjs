import React, { useState, useEffect } from 'react';
import { useSelf, useOthers, useUpdateMyPresence } from "../liveblocks.config.ts";
import styles from "./MemorizingBuddy.module.css";
import lemonstre from "../data/lemonstre";
import romeoandjuliet from "../data/romeoandjuliet";
import bigbangtheory from "../data/bigbangtheory";
import library from "../data/library";
import Line from "../components/Line";
import Cursor from '../components/Cursor';
import { Avatar } from "../components/Avatar";
import { textVide } from 'text-vide';

export function MemorizingBuddy() {


    const [libraryOfScripts, setLibraryOfScripts] = useState([]);
    const [script, setScript] = useState(null);
    const [cast, setCast] = useState([]);
    const [isHiddenLines, setIsHiddenLines] = useState(false);
    const [isOptimizedReading, setIsOptimizedReading] = useState(false);
    const [isAnnotationMode, setIsAnnotationMode] = useState(false);
    const lineIncrement = 0;


    //LiveBlocks
    const others = useOthers().toArray();
    const currentUser = useSelf();
    const othersCursors = others.map((user) => user.presence?.cursor);
    const hasMoreUsers = others.length > 3;
    const updateMyPresence = useUpdateMyPresence();



    const onScriptSelected = (event) => {
        console.log("Select value: " + event.target.value)
        const scriptId = event.target.value;
        loadScript(scriptId);
    }

    const loadScript = (scriptId) => {
        const newScript = null;

        if (scriptId == "lemonstre") { newScript = lemonstre }
        else if (scriptId == "romeoandjuliet") { newScript = romeoandjuliet }
        else if (scriptId == "bigbangtheory") { newScript = bigbangtheory }
        else { newScript = bigbangtheory }

        setScript(newScript.script)
        setCast(newScript.script.cast.map(value => (
            {
                id: value.id,
                displayName: value.displayName,
                isHighlighted: false
            })))
    };

    useEffect(() => {
        setLibraryOfScripts(library.scripts)
        loadScript(library.scripts[0].id)
    }, []);

    //What's the best way to handle localization?
    const renderOptions = () => {
        return (
            <div className={styles.optionsSection}>
                <fieldset className={styles.fieldsetOption}>
                    <legend>Select the script to practice</legend>
                    <div>{renderAllScriptsSelector()}</div>
                </fieldset>
                <fieldset className={styles.fieldsetOption}>
                    <legend>Who are you?</legend>
                    <ul>
                        {cast.map(character => renderOptionCharacter(character))}
                    </ul>
                </fieldset>
                <fieldset className={styles.fieldsetOption}>
                    <legend>Options</legend>
                    <ul>
                        <li>
                            <input
                                type="checkbox" checked={isHiddenLines} id="hideLines" name="hideLines" value="hide"
                                onClick={(event) => onHideLinesOptionClick(event)} />
                            <label for="hideLines">
                                🧑‍🦯 Hide your lines
                            </label>
                        </li>
                        <li>
                            <input
                                type="checkbox" checked={isOptimizedReading} id="optimizeForReading" name="optimizeForReading" value="optimizeForReading"
                                onClick={(event) => onOptimizeForReadingClick(event)} />
                            <label for="optimizeForReading">
                                👓 Optimize for reading
                            </label>
                        </li>
                        <li>
                            <input
                                type="checkbox" checked={isAnnotationMode} id="annotationMode" name="annotationMode" value="annotationMode"
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
            </div>
        );
    }

    const onHideLinesOptionClick = (event) => { setIsHiddenLines(event.target.checked); }
    const onOptimizeForReadingClick = (event) => { setIsOptimizedReading(event.target.checked); }
    const onAnnotationModeClick = (event) => { setIsAnnotationMode(event.target.checked); }

    const handleHighlightOptionClick = (event, characterId) => {
        const newCast = cast.slice();
        var castKey = newCast.findIndex((x, i) => x.id == characterId);
        newCast[castKey].isHighlighted = event.target.checked;
        setCast(newCast);
    }

    const renderOptionCharacter = (character) => {
        return (
            <li>
                <input
                    type="checkbox" checked={character.isHighlighted} id={character.id} name={character.id} value={character.id}
                    onClick={(event) => handleHighlightOptionClick(event, character.id)} />
                <label for={character.id}>
                    {character.displayName}
                </label>
            </li>
        );
    }


    const renderScript = () => {
        return (
            <div className={styles.script}>
                <h2>{script.title}</h2>
                <div>{renderSections(script.sections)}</div>
            </div>
        );
    }

    const renderAllScriptsSelector = () => {
        return (
            <div>
                <select id="scriptSelector" onChange={(event) => onScriptSelected(event)} >
                    {libraryOfScripts.map((script) => {
                        return (
                            <option value={script.id}>{script.displayName}</option>
                        );
                    })}
                </select>
            </div>
        );
    }

    const renderSections = (sections) => {
        return (
            <div>
                {
                    sections.map((section) => {
                        return (
                            <div className={styles.section}>
                                <h3>Act {section.number}</h3>
                                <ul>{section.lines.map((line) => {
                                    const newIncrementValue = lineIncrement;
                                    lineIncrement = newIncrementValue + 1;
                                    return (renderLine(line));
                                }
                                )}</ul>
                            </div>
                        );
                    })
                }
            </div>
        )
    }

    const renderLine = (line) => {
        let currentCharacter = cast.findLast((character) => { return character.id == line.characterId });
        return (
            <Line
                characterId={line.characterId}
                displayName={currentCharacter.displayName}
                text={line.text}
                isHighlighted={currentCharacter.isHighlighted}
                hideHighlightedLines={isHiddenLines}
                optimizeReading={isOptimizedReading}
                annotationMode={isAnnotationMode}
                lineId={lineIncrement}
            />
        )
    }

    if (script == null) {
        return <div>Loading...</div>
    }

    return (
        <div>
        <div className={styles.header}>
            <h1 className={styles.appTitle}>Memorizing Buddy</h1>
            <div className={styles.avatarsSection}>
                {others.map(({ connectionId, info }) => {
                    return (
                        <Avatar
                            key={connectionId}
                            picture={info.picture}
                            name={info.name}
                        />
                    );
                })}

                {currentUser && (
                        <Avatar picture={currentUser.info?.picture} name="You" />
                )}
            </div>
            </div>

            <div>{renderOptions()}</div>
            <div>{renderScript()}</div>
        </div>
    );
}