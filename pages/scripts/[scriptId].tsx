import { useRouter } from "next/router";
import Practice from '../../components/Practice'
import { RoomProvider } from "../../liveblocks.config"
import { LiveList, LiveMap } from "@liveblocks/client";
import { AnnotationType, UserToCharactersType } from "../../data/types";
import Loading from "../../components/Loading";
import { Suspense } from "react";

export default function ScriptView() {
    const router = useRouter();
    const { scriptId, userId } = router.query;

    const initialStorage = () => ({
        charactersSelectedPerUser: new LiveMap([]),
        annotations: new LiveList([])
    });

    if (scriptId == null) {
        return (<Loading />);
    }

    return (
        <>
        <Suspense fallback={(<Loading />)}>
            <RoomProvider
                id={scriptId as string}
                initialPresence={{}}
                initialStorage={initialStorage}>

                <Practice
                    currentScriptId={scriptId as string}
                    currentUserId={userId as string}
                />

            </RoomProvider>
            </Suspense>

        </>)
}