
export type UserType = {
    id: string,
    displayName: string,
    avatar: string,
}

export type ScriptType = {
    id: string,
    type: string,
    title: string,
    lang: string,
    cast: CharacterType[],
    sections: SectionType[]
}

export type CharacterType = {
    id: string,
    displayName: string,
    isHighlighted?: boolean
}

export type SectionType = {
    number: string,
    isDisplayed?: boolean,
    lines: LineType[]
}

export type LineType = {
    id: string,
    characterId: string,
    text: string,
    character: CharacterType,
}

export type AnnotationType = {
    scriptId: string,
    lineId: string,
    text: string,
    userId: string,
    user?: UserType
}

export type UserToCharactersType = {
    userId: string,
    scriptId: string,
    characterIds: string[]
}