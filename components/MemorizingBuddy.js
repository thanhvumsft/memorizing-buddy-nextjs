import React, { useState, useEffect } from 'react'
import { useSelf, useOthers, useMyPresence, useList } from "../liveblocks.config.ts"
import lemonstre from "../data/lemonstre"
import romeoandjuliet from "../data/romeoandjuliet"
import bigbangtheory from "../data/bigbangtheory"
import library from "../data/library"
import users from "../data/users"
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

    const loadUser = (userId) => {
        let userIndex = users.users.findIndex((x, i) => x.id == userId)
        let newUser = users.users[userIndex]
        updateMyPresence(
            {
                displayName: newUser.displayName,
                avatar: newUser.avatar
            })
        setUser(newUser)
    }

    const loadScript = (scriptId) => {
        const newScript = null

        if (scriptId == "lemonstre") { newScript = lemonstre }
        else if (scriptId == "romeoandjuliet") { newScript = romeoandjuliet }
        else if (scriptId == "bigbangtheory") { newScript = bigbangtheory }
        else { newScript = bigbangtheory }

        newScript.script.sections = newScript.script.sections.map(value => (
            {
                number: value.number,
                lines: value.lines,
                isDisplayed: true
            }))

        setScript(newScript.script)
        setCast(newScript.script.cast.map(value => (
            {
                id: value.id,
                displayName: value.displayName,
                isHighlighted: false
            })))
    }

    useEffect(() => {
        setAllUsers(users.users)
        setAllScripts(library.scripts)
        loadUser(users.users[Math.floor(Math.random() * users.users.length)].id)
        loadScript(library.scripts[0].id)
    }, [])

    const isHiddenLinesChanged = (data) => setIsHiddenLines(data)
    const isOptimizedReadingChanged = (data) => setIsOptimizedReading(data)
    const isAnnotationModeChanged = (data) => setIsAnnotationMode(data)
    const scriptChanged = (data) => setScript(data)
    const castChanged = (data) => setCast(data)

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