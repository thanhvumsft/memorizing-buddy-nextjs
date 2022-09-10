import React from 'react'
import { ScriptType, UserType } from '../data/types'

type MockBackOfficeProps = {
    currentUserId: string,
    allUsers: UserType[],
    userIdChanged: Function,

    currentScriptId: string,
    allScripts: ScriptType[],
    scriptIdChanged: Function,
}

export default function MockBackOffice(props: MockBackOfficeProps) {

    const renderAllScriptsSelector = () => {
        return (
            <>
                <select id="scriptSelector" value={props.currentScriptId} onChange={(event) => onScriptSelected(event)} >
                    {props.allScripts.map((script) => {
                        return (
                            <option value={script.id}>{script.title}</option>
                        )
                    })}
                </select>
            </>
        )
    }

    const renderAllUsersSelector = () => {
        return (
            <>
                <select id="userSelector" value={props.currentUserId} onChange={(event) => onUserSelected(event)} >
                    {props.allUsers.map((user) => {
                        return (
                            <option value={user.id}>{user.displayName}</option>
                        )
                    })}
                </select>
            </>
        )
    }

    const onScriptSelected = (event) => props.scriptIdChanged(event.target.value)
    const onUserSelected = (event) => props.userIdChanged(event.target.value)

    return (
        <>
            <fieldset>
                <legend>Setup your experience</legend>
                <div>What user are you?</div>
                <div>{renderAllUsersSelector()}</div>
                <div>What script do you want to practice?</div>
                <div>{renderAllScriptsSelector()}</div>
            </fieldset>
        </>
    )
}
