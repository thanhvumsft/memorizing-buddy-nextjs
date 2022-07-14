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

    const loadScript = (scriptId) =>{
        const newScript = null;

        if(scriptId=="lemonstre") {newScript=lemonstre}
        else if(scriptId=="romeoandjuliet") {newScript=romeoandjuliet}
        else if(scriptId=="bigbangtheory") {newScript=bigbangtheory}
        else {newScript=bigbangtheory}

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
            <div>
                <fieldset className={styles.fieldset}>
                    <legend>Who are you?</legend>
                    <ul>
                        <ul>{cast.map(character => renderOptionCharacter(character))}</ul>
                    </ul>
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <legend>Options</legend>
                    <div>
                        <input
                            type="checkbox" checked={isHiddenLines} id="hideLines" name="hideLines" value="hide"
                            onClick={(event) => onHideLinesOptionClick(event)} />
                        <label for="hideLines">
                            🧑‍🦯 Hide your lines
                        </label>
                    </div>
                    <div>
                        <input
                            type="checkbox" checked={isOptimizedReading} id="optimizeForReading" name="optimizeForReading" value="optimizeForReading"
                            onClick={(event) => onOptimizeForReadingClick(event)} />
                        <label for="optimizeForReading">
                            👓 Optimize for reading
                        </label>
                    </div>
                    <div>
                        <input
                            type="checkbox" checked={isAnnotationMode} id="annotationMode" name="annotationMode" value="annotationMode"
                            onClick={(event) => onAnnotationModeClick(event)} />
                        <label for="annotationMode">
                            📝 Activate annotation mode
                        </label>
                    </div>
                    <div>
                        <button>👤 Practice on your own <i>(Soon!)</i></button>
                    </div>
                    <div>
                        <button>👥 Start a group practice <i>(Soon!)</i></button>
                    </div>
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
            <div>
                <input
                    type="checkbox" checked={character.isHighlighted} id={character.id} name={character.id} value={character.id}
                    onClick={(event) => handleHighlightOptionClick(event, character.id)} />
                <label for={character.id}>
                    {character.displayName}
                </label>
            </div>
        );
    }


    const renderScript = () => {
        return (
            <div>
                <h4>{script.title}</h4>
                <div>{renderSections(script.sections)}</div>

            </div>
        );
    }

    const renderAllScriptsSelector = () => {
        return (
            <div>
                <label for="scriptSelector">Choose your script to practice: </label>
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
                            <div>
                                <h4>Act {section.number}</h4>
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
            <main className="flex place-items-center place-content-center select-none">
                <div className="flex pl-3">
                    {others.slice(0, 3).map(({ connectionId, info }) => {
                        return (
                            <Avatar
                                key={connectionId}
                                picture={info.picture}
                                name={info.name}
                            />
                        );
                    })}

                    {hasMoreUsers && <div className={styles.more}>+{others.length - 3}</div>}

                    {currentUser && (
                        <div className="relative ml-8 first:ml-0">
                            <Avatar picture={currentUser.info?.picture} name="You" />
                        </div>
                    )}
                </div>
            </main>
            <h1>Memorizing Buddy</h1>

            <div>{renderAllScriptsSelector()}</div>
            <div>{renderOptions()}</div>
            <div>{renderScript()}</div>
        </div>

    );
}