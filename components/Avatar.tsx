import React from "react"
import styles from "./Avatar.module.css"

const IMAGE_SIZE = 48

type AvatarType = {
  connectionId?: string,
  picture: string,
  name: string,
}

export function Avatar(props: AvatarType) {
  return (
    <div className={styles.avatar} data-tooltip={props.name}>
      <img
        src={props.picture}
        height={IMAGE_SIZE}
        width={IMAGE_SIZE}
        className={styles.avatar_picture}
      />
    </div>
  )
}
