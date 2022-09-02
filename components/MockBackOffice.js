import React from 'react'

export default function MockBackOffice(props) {

    const renderAllScriptsSelector = () => {
        return (
            <>
                <select id="scriptSelector" onChange={(event) => onScriptSelected(event)} >
                    {props.allScripts.map((script) => {
                        return (
                            <option value={script.id}>{script.displayName}</option>
                        )
                    })}
                </select>
            </>
        )
    }

    const renderAllUsersSelector = () => {
        return (
            <>
                <select id="userSelector" value={props.user.id} onChange={(event) => onUserSelected(event)} >
                    {props.allUsers.map((user) => {
                        return (
                            <option value={user.id}>{user.displayName}</option>
                        )
                    })}
                </select>
            </>
        )
    }

    const onScriptSelected = (event) => props.loadScript(event.target.value)
    const onUserSelected = (event) => props.loadUser(event.target.value)

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
