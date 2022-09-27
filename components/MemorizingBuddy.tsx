import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { useOthers, useMyPresence } from "../liveblocks.config"
import { ScriptType, CharacterType } from "../data/types"

import sourceAllScripts from "../data/allScripts.json"
import sourceAllUsers from "../data/allUsers.json"

import MockBackOffice from './MockBackOffice'
import Header from './Header'
import Footer from './Footer'
import Practice from './Practice'
import Loading from './Loading';

export function MemorizingBuddy() {

    const router = useRouter();
  const { userId, scriptId } = router.query;

    const [allUsers, setAllUsers] = useState([])
    const [allScripts, setAllScripts] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [currentScriptId, setCurrentScriptId] = useState(sourceAllScripts[Math.floor(Math.random() * sourceAllScripts.length)].id)
    const [currentUserId, setCurrentUserId] = useState(sourceAllUsers[Math.floor(Math.random() * sourceAllUsers.length)].id)

    const [isHiddenLines, setIsHiddenLines] = useState(false)
    const [isOptimizedReading, setIsOptimizedReading] = useState(false)
    const [isAnnotationMode, setIsAnnotationMode] = useState(false)

    const others = useOthers()
    const [myPresence, updateMyPresence] = useMyPresence()

    const loadUser = (userId: string) => {
        let userIndex = sourceAllUsers.findIndex((x, i) => x.id == userId)
        let newUser = sourceAllUsers[userIndex]
        updateMyPresence(
            {
                displayName: newUser.displayName,
                avatar: newUser.avatar,
                id: newUser.id
            })
        setCurrentUser(newUser)
    }

    useEffect(() => {
        setAllUsers(sourceAllUsers)
        setAllScripts(sourceAllScripts)
        loadUser(currentUserId)
        // loadScript(library.scripts[0].id)


    }, [router.query])

    const isHiddenLinesChanged = (data: boolean) => setIsHiddenLines(data)
    const isOptimizedReadingChanged = (data: boolean) => setIsOptimizedReading(data)
    const isAnnotationModeChanged = (data: boolean) => setIsAnnotationMode(data)
    const castChanged = (data: CharacterType[]) => setCast(data)

    const currentScriptIdChanged = (data: string) => setCurrentScriptId(data)
    const currentUserIdChanged = (data: string) => setCurrentUserId(data)

    if (currentUser == null) {
        return <Loading />
    }

    return (

        <>

            <Header
                myPresence={myPresence}
                others={others}
            />

            <MockBackOffice
                currentUserId={currentUserId}
                allUsers={allUsers}
                userIdChanged={currentUserIdChanged}
                
                currentScriptId={currentScriptId}
                allScripts={allScripts}
                scriptIdChanged={currentScriptIdChanged}
                />
 
            <Practice
                currentScriptId={currentScriptId}
                allUsers={allUsers}
                currentUserId={currentUserId}

                isHiddenLines={isHiddenLines} isHiddenLinesChanged={isHiddenLinesChanged}
                isOptimizedReading={isOptimizedReading} isOptimizedReadingChanged={isOptimizedReadingChanged}
                isAnnotationMode={isAnnotationMode} isAnnotationModeChanged={isAnnotationModeChanged}
            /> 


            <Footer />

        </>
    )
}