import React, { useState, useEffect } from 'react'
import Options from './Options'
import Script from './Script'
import Footer from './Footer'
import sourceAllScripts from "../data/allScripts.json"
import sourceAllUsers from "../data/allUsers.json"
import { useOthers, useMyPresence, useStorage, useMutation } from "../liveblocks.config"
import { ScriptType, UserType, CharacterType, AnnotationType } from "../data/types"
import Header from './Header'
import Loading from './Loading'

type PracticeProps = {
    currentScriptId: string,
    currentUserId: string,
}


export default function Practice(props: PracticeProps) {
    //Liveblocks
    const others = useOthers()
    const [myPresence, updateMyPresence] = useMyPresence()
    const charactersSelectedPerUser = useStorage((root) => root.charactersSelectedPerUser);
    const annotations = useStorage((root) => root.annotations);
    
    const addOrUpdateAnnotation = useMutation(({ storage }, annotation) => {
        console.log("Function: addOrUpdateAnnotation")
        const annotationKey = storage.get("annotations").findIndex((x) =>   x.userId == annotation.userId && 
                                                                            x.lineId == annotation.lineId && 
                                                                            x.scriptId == annotation.scriptId)  
       
        console.log("annotationKey: " + annotationKey)
        if 
            (annotationKey >= 0) storage.get("annotations").set(annotationKey, annotation)
        else 
            storage.get("annotations").push(annotation)
    }, []);

    //Sates
    const [allUsers, setAllUsers] = useState<UserType[]>([])
    const [currentUser, setCurrentUser] = useState<UserType>(null)
    const [script, setScript] = useState<ScriptType>(null)
    const [cast, setCast] = useState<CharacterType[]>([])
    const [isHiddenLines, setIsHiddenLines] = useState(false)
    const [isOptimizedReading, setIsOptimizedReading] = useState(false)
    const [isAnnotationMode, setIsAnnotationMode] = useState(false)

    //OnCHanged events
    const isHiddenLinesChanged = (data: boolean) => setIsHiddenLines(data)
    const isOptimizedReadingChanged = (data: boolean) => setIsOptimizedReading(data)
    const isAnnotationModeChanged = (data: boolean) => setIsAnnotationMode(data)
    const scriptChanged = (data: ScriptType) => setScript(data)

    const castChanged = (data: CharacterType[]) => {
        setCast(data)

        let userToCharacters = 
        {
            userId: currentUser.id,
            scriptId: script.id,
            characterIds: data.filter(c => c.isHighlighted).map(c => c.id)
        }

        charactersSelectedPerUser.set(generateUserToCharactersUniqueId(script.id, currentUser.id), userToCharacters)
    }

    const generateUserToCharactersUniqueId = (scriptId:string, userId:string) => {return scriptId + "-" + userId}

    //Function
    let getUserDisplayNameFromUserId = (userId: string) => {
        let user = getUserFromId(userId)
        let displayName = user == null ? "Unknown" : user.displayName
        return displayName
    }
    let getUserAvatarFromUserId = (userId: string) => {
        let user = getUserFromId(userId)
        let avatar = user == null ? "" : user.avatar
        return avatar
    }

    let getUserFromId = (userId: string) => {
        let userIndex = allUsers.findIndex((x) => x.id == userId)
        let foundUser = allUsers[userIndex]
        return foundUser
    }
    let getCharacterDisplayNameFromUserId = (userId: string) => {
        let character = getCharacterFromId(userId)
        let displayName = character == null ? "Unknown" : character.displayName
        return displayName
    }

    const getCharacterFromId = (characterId: string) => {
        let characterIndex = cast.findIndex((x) => x.id == characterId)
        let foundCharacter = cast[characterIndex]
        return foundCharacter
    }

    // const getIsCharacterHighlightedFromStorage = (userId: string, scriptId: string, characterId: string) => {

    //     let result = charactersSelectedPerUser.findLast(x => x.userId == userId && x.scriptId == scriptId)
    //     let yaya = result.characterIds.findLast(x => x == characterId)
    //     return yaya != null ? true : false
    // }


    const loadScript = (scriptId: string) => {

        let currentScript = sourceAllScripts.findLast(s => s.id == scriptId)

        // currentScript.cast.map(c => c.isHighlighted = getIsCharacterHighlightedFromStorage(props.currentUserId, props.currentScriptId, c.id))

        currentScript.sections.map(s => s.isDisplayed = true)
        currentScript.sections.map(s => s.lines.map(l => l.character = {
            id: l.characterId,
            displayName: getCharacterDisplayNameFromUserId(l.characterId),
            isHighlighted: false //DANGER HERE
        }))

        setScript(currentScript)
        setCast(currentScript.cast)
    }

    const loadUser = (userId: string) => {
        console.log("*** loadUser")
        let userIndex = sourceAllUsers.findIndex((x, i) => x.id == userId)
        let newUser = sourceAllUsers[userIndex]
        updateMyPresence(
            {
                displayName: newUser.displayName,
                avatar: newUser.avatar,
                id: newUser.id,
            })
        setCurrentUser(newUser)
    }
    useEffect(() => {
        console.log("==> UseEffect: []]")
        setAllUsers(sourceAllUsers)
        loadUser(props.currentUserId)
        loadScript(props.currentScriptId)
    }, [])


    useEffect(() => {
        console.log("==> UseEffect: annotations")
      }, [annotations]);
      
      useEffect(() => {
        console.log("==> UseEffect: charactersSelectedPerUser")
      }, [charactersSelectedPerUser]);

    if(script==null || cast==null)
    {
        return (<Loading />)
    }


    return (
        <>
            <Header myPresence={myPresence} others={others} />
            
             <Options
                script={script} scriptChanged={scriptChanged}
                cast={cast} castChanged={castChanged}

                isHiddenLines={isHiddenLines} isHiddenLinesChanged={isHiddenLinesChanged}
                isOptimizedReading={isOptimizedReading} isOptimizedReadingChanged={isOptimizedReadingChanged}
                isAnnotationMode={isAnnotationMode} isAnnotationModeChanged={isAnnotationModeChanged}

                charactersSelectedPerUser={charactersSelectedPerUser}
                generateUserToCharactersUniqueId={generateUserToCharactersUniqueId}
            />

            <Script
                script={script} cast={cast} annotations={annotations}
                addOrUpdateAnnotation={addOrUpdateAnnotation}
                users={allUsers} currentUserId={props.currentUserId}
                isHiddenLines={isHiddenLines} isOptimizedReading={isOptimizedReading} isAnnotationMode={isAnnotationMode}
            /> 

            <Footer />
        </>
    )
}
