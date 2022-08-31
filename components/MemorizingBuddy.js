import React, { useState, useEffect } from 'react';
import { useSelf, useOthers, useUpdateMyPresence, useList } from "../liveblocks.config.ts";
import styles from "./MemorizingBuddy.module.css";
import lemonstre from "../data/lemonstre";
import romeoandjuliet from "../data/romeoandjuliet";
import bigbangtheory from "../data/bigbangtheory";
import library from "../data/library";
import users from "../data/users";
import Line from "../components/Line";
import { Avatar } from "../components/Avatar";
import DataWidget from './DataWidget';

export function MemorizingBuddy() {

    const [allUsers, setAllUsers] = useState([]);
    const [allScripts, setAllScripts] = useState([]);
    const [user, setUser] = useState(null);
    const [script, setScript] = useState(null);
    const [cast, setCast] = useState([]);

    const [isHiddenLines, setIsHiddenLines] = useState(false);
    const [isOptimizedReading, setIsOptimizedReading] = useState(false);
    const [isAnnotationMode, setIsAnnotationMode] = useState(false);

    const lineIncrement = 0;

    //LiveBlocks
    const others = useOthers().toArray();
    const currentUser = useSelf();
    const annotations = useList("annotations");
    
    const getUserFromId = (userId) => {
        let userIndex = users.users.findIndex((x, i) => x.id == userId)
        let foundUser = users.users[userIndex];
        return foundUser;
    }
    
    const onAddOrUpdateAnnotation = (userId, lineId, text) => {
        const annotationKey = annotations.findIndex((x)=>x.userId == userId && x.lineId==lineId);
        if(annotationKey >= 0)
        {
            annotations.set(annotationKey, { lineId: lineId, text: text, userId: userId });
        }
        else
        {
            annotations.push({ lineId: lineId, text: text, userId: userId });
        }
    }

    const onScriptSelected = (event) => {
        const scriptId = event.target.value;
        loadScript(scriptId);
    }

    const onUserSelected = (event) => {
        const userId = event.target.value;
        loadUser(userId);
    }

    const loadUser = (userId) => {
        let userIndex = users.users.findIndex((x, i) => x.id == userId)
        let newUser = users.users[userIndex];
        setUser(newUser)
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
        setAllUsers(users.users)
        setAllScripts(library.scripts)
        loadUser(users.users[Math.floor(Math.random() * users.users.length)].id)
        loadScript(library.scripts[0].id)
    }, []);

    //What's the best way to handle localization?
    const renderOptions = () => {
        return (
            <div className={styles.sectionOptions}>
                <fieldset className={styles.fsOptionScript}>
                    <legend>Setup your experience</legend>
                    <div>What user are you?</div>
                    <div>{renderAllUsersSelector()}</div>
                    <div>What script do you want to practice?</div>
                    <div>{renderAllScriptsSelector()}</div>
                </fieldset>
                <fieldset className={styles.fsOptionWho}>
                    <legend>Data</legend>
                    <DataWidget 
                        script={script} 
                        cast={cast}
                    />
                </fieldset>
                <fieldset >
                    <legend>What character are you?</legend>
                    <ul>
                        {cast.map(character => renderOptionCharacter(character))}
                    </ul>
                </fieldset>
                <fieldset className={styles.fsOptionFeatures}>
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

    const onHighlightOptionClick = (event, characterId) => {
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
                    onClick={(event) => onHighlightOptionClick(event, character.id)} />
                <label for={character.id}>
                    {character.displayName}
                </label>
            </li>
        );
    }


    const renderScript = () => {
        return (
            <div className={styles.sectionScript}>
                <h2>{script.title}</h2>
                <div>{renderSections(script.sections)}</div>
            </div>
        );
    }

    const renderAllScriptsSelector = () => {
        return (
            <div>
                <select id="scriptSelector" onChange={(event) => onScriptSelected(event)} >
                    {allScripts.map((script) => {
                        return (
                            <option value={script.id}>{script.displayName}</option>
                        );
                    })}
                </select>
            </div>
        );
    }

    const renderAllUsersSelector = () => {
        return (
            <div>
                <select id="userSelector" value={user.id} onChange={(event) => onUserSelected(event)} >
                    {allUsers.map((user) => {
                        return (
                            <option value={user.id}>{user.displayName}</option>
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
                                    return (
                                        renderLine(line) 
                                        );
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

        let lineId = script.id+"-"+line.id;
        let currentCharacter = cast.findLast((character) => { return character.id == line.characterId });
        let lineAnnotations = annotations.filter((annotation)=> annotation.lineId == lineId);
        let currentUserAnnotation = lineAnnotations.findLast((annotation)=> annotation.userId == user.id);
        let otherUsersAnnotations = lineAnnotations.filter((annotation)=> annotation.userId != user.id);

        return (
            <Line
                id={lineId}

                characterId={line.characterId}
                displayName={currentCharacter.displayName}
                isHighlighted={currentCharacter.isHighlighted}
                text={line.text}
                
                //TODO: REPLACE WITH LIVEBLOCKS' USESELF?
                currentUser={user}
                getUserFromId={getUserFromId}

                hideHighlightedLines={isHiddenLines}
                optimizeReading={isOptimizedReading}
                annotationMode={isAnnotationMode}

                currentUserAnnotation={currentUserAnnotation}
                otherUsersAnnotations={otherUsersAnnotations}
                onAddOrUpdateAnnotation={onAddOrUpdateAnnotation}
            />
        )
    }

    if (user == null || script == null || annotations == null) {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.container}>
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

            {renderOptions()}

            {renderScript()} 

            <div className={styles.footer}>
                <div>Made with 🧡 by <a href="https://twitter.com/adigau31">Adrien Gaudon</a> 🎭</div>
                <div>Powered by <a href="https://twitter.com/liveblocks">Liveblocks</a> 🧱</div>
            </div>
        </div>
    );
}