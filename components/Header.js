import React from 'react'
import { Avatar } from "../components/Avatar"

export default function Header(props) {

    return (<>
        <div>
            <h1>Memorizing Buddy</h1>
            <div>
                {props.others.map((other) => {
                    return (
                        <Avatar
                            key={other.connectionId}
                            picture={other.presence?.avatar}
                            name={other.presence?.displayName}
                        />
                    )
                })}

                {props.myPresence && (
                    <Avatar picture={props.myPresence.avatar} name={"You (" + props.myPresence.displayName + ")"}/>
                )}
            </div>
        </div>

    </>)
}
