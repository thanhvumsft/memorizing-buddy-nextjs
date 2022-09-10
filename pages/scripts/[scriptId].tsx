import { useRouter } from "next/router";
import Practice from '../../components/Practice'
import { RoomProvider } from "../../liveblocks.config"
import { LiveList, LiveMap } from "@liveblocks/client";
import { AnnotationType, UserToCharactersType } from "../../data/types";

export default function ScriptView() {
    const router = useRouter();
    const { scriptId, userId } = router.query;

    const initialStorage = () => ({
      charactersSelectedPerUser: new LiveMap<string,UserToCharactersType>(),
      annotations: new LiveList([])
    });

    if (scriptId == null) {
        return (<>Loading...</>);
    }

    return (
        <>
            <RoomProvider
                id={scriptId as string}
                initialStorage={initialStorage}>

                <Practice
                    currentScriptId={scriptId as string}
                    currentUserId={userId as string}
                />

            </RoomProvider>

        </>)
}