
import React from 'react'
import { Avatar } from "../components/Avatar"

export default function Header(props) {

    return (<>
        <div>
            <h1>Memorizing Buddy</h1>
            <div>
                {props.others.map(({ connectionId, info }) => {
                    return (
                        <Avatar
                            key={connectionId}
                            picture={info.picture}
                            name={info.name}
                        />
                    )
                })}

                {props.currentUser && (
                    <Avatar picture={props.currentUser.info?.picture} name="You" />
                )}
            </div>
        </div>

    </>)
}
