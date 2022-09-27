
import React from 'react'
import { Avatar } from "./Avatar"
import { Presence } from "../liveblocks.config"

//TODO: How do I replace tis with Liveblock's official types?
type HeaderProps ={
    myPresence?: Presence,
    others?: {
        connectionId: string,
        presence?: Presence
    }[]
}

export default function Header(props: HeaderProps) {

    return (<>
        <div>
            <h1>Memorizing Buddy</h1>
            <div>
                {props.others.map((other) => {
                    return (
                        <Avatar
                            key={other.connectionId}
                            picture={other.presence.avatar}
                            name={other.presence.displayName}
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
