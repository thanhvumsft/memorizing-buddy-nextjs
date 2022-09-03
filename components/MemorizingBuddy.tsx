import React, { useState, useEffect } from 'react'
import { useOthers, useMyPresence, useList } from "../liveblocks.config"
import { ScriptType, CharacterType } from "../data/types"
import lemonstre from "../data/lemonstre.json"
import romeoandjuliet from "../data/romeoandjuliet.json"
import bigbangtheory from "../data/bigbangtheory.json"
import library from "../data/library.json"
import users from "../data/users.json"
import MockBackOffice from './MockBackOffice'
import Options from './Options'
import Header from './Header'
import Script from './Script'
import Footer from './Footer'

export function MemorizingBuddy() {

    const [allUsers, setAllUsers] = useState([])
    const [allScripts, setAllScripts] = useState([])
    const [user, setUser] = useState(null)
    const [script, setScript] = useState(null)
    const [cast, setCast] = useState([])

    const [isHiddenLines, setIsHiddenLines] = useState(false)
    const [isOptimizedReading, setIsOptimizedReading] = useState(false)
    const [isAnnotationMode, setIsAnnotationMode] = useState(false)

    const others = useOthers().toArray()
    const annotations = useList("annotations")
    const [myPresence, updateMyPresence] = useMyPresence()

    const loadUser = (userId: string) => {
        let userIndex = users.users.findIndex((x, i) => x.id == userId)
        let newUser = users.users[userIndex]
        updateMyPresence(
            {
                displayName: newUser.displayName,
                avatar: newUser.avatar
            })
        setUser(newUser)
    }

    const loadScript = (scriptId: string) => {

        let scriptJson = null

        if (scriptId == "lemonstre") { scriptJson = lemonstre }
        else if (scriptId == "romeoandjuliet") { scriptJson = romeoandjuliet }
        else if (scriptId == "bigbangtheory") { scriptJson = bigbangtheory }
        else { scriptJson = bigbangtheory }

        let newScript: ScriptType = {
            id: scriptJson.script.id,
            type: scriptJson.script.type,
            title: scriptJson.script.title,
            lang: scriptJson.script.lang,
            cast: scriptJson.script.cast.map(c => (
                {
                    id: c.id,
                    displayName: c.displayName,
                    isHighlighted: false
                })),
            sections: scriptJson.script.sections.map(s => (
                {
                    number: s.number,
                    lines: s.lines.map(l=>({
                        id: l.id,
                        characterId: l.characterId,
                        text: l.text,
                        character: {
                            id: l.characterId,
                            displayName: "",
                            isHighlighted: false
                        },
                    })),
                    isDisplayed: true
                }))
        } 

        setScript(newScript)
        setCast(newScript.cast)
    }

    useEffect(() => {
        setAllUsers(users.users)
        setAllScripts(library.scripts)
        loadUser(users.users[Math.floor(Math.random() * users.users.length)].id)
        loadScript(library.scripts[0].id)
    }, [])

    const isHiddenLinesChanged = (data: boolean) => setIsHiddenLines(data)
    const isOptimizedReadingChanged = (data: boolean) => setIsOptimizedReading(data)
    const isAnnotationModeChanged = (data: boolean) => setIsAnnotationMode(data)
    const scriptChanged = (data: ScriptType) => setScript(data)
    const castChanged = (data: CharacterType[]) => setCast(data)

    if (user == null || script == null || annotations == null) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Header
                others={others}
                myPresence={myPresence}
            />

            <MockBackOffice
                user={user}
                allScripts={allScripts} loadScript={loadScript}
                allUsers={allUsers} loadUser={loadUser}
            />

            <Options
                script={script} scriptChanged={scriptChanged}
                cast={cast} castChanged={castChanged}

                isHiddenLines={isHiddenLines} isHiddenLinesChanged={isHiddenLinesChanged}
                isOptimizedReading={isOptimizedReading} isOptimizedReadingChanged={isOptimizedReadingChanged}
                isAnnotationMode={isAnnotationMode} isAnnotationModeChanged={isAnnotationModeChanged}
            />

            <Script
                script={script} cast={cast} annotations={annotations}
                users={users.users} user={user}
                isHiddenLines={isHiddenLines} isOptimizedReading={isOptimizedReading} isAnnotationMode={isAnnotationMode}
            />

            <Footer />

        </div>
    )
}