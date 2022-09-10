import React, { useMemo } from "react";
import { MemorizingBuddy } from "../components/MemorizingBuddy";
import { RoomProvider, useOthers, useSelf } from "../liveblocks.config";
import { useRouter } from "next/router";

import { LiveList } from "@liveblocks/client";



export default function Page() {
  const roomId = useOverrideRoomId("memorizing-buddy");

  return (
    <RoomProvider
      id={roomId}
      initialStorage={
        { 
          annotations: new LiveList(),
          charactersSelected:  new LiveList() 
        }}>
      <MemorizingBuddy />
    </RoomProvider>
  );
}

export async function getStaticProps() {
  const API_KEY = process.env.API_KEY;
  const API_KEY_WARNING = process.env.API_KEY_WARNING

    ? `Add your secret key from https://liveblocks.io/dashboard/apikeys as the \`LIVEBLOCKS_SECRET_KEY\` secret in CodeSandbox.\n` +
    `Learn more: https://github.com/liveblocks/liveblocks/tree/main/examples/nextjs-live-avatars#codesandbox.`
    : `Create an \`.env.local\` file and add your secret key from https://liveblocks.io/dashboard/apikeys as the \`LIVEBLOCKS_SECRET_KEY\` environment variable.\n` +
    `Learn more: https://github.com/liveblocks/liveblocks/tree/main/examples/nextjs-live-avatars#getting-started.`;

  if (!API_KEY) {
    console.warn(API_KEY_WARNING);
  }

  return { props: {} };
}

/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */
function useOverrideRoomId(roomId: string) {
  const { query } = useRouter();
  const overrideRoomId = useMemo(() => {
    return query?.roomId ? `${roomId}-${query.roomId}` : roomId;
  }, [query, roomId]);

  return overrideRoomId;
}
