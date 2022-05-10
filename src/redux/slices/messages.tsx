import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const POST_URL = "http://localhost:8000/messages";

export interface Message {
    id: number;
    sender: string;
    receiver: string;
    senderAvatar: string;
    receiverAvatar: string;
    message: string;
}


export const messages = createApi({
    baseQuery: fetchBaseQuery(
        { baseUrl: '' }),
        endpoints: (build) => ({
            getMessages: build.query<Message[], void>({
                query: () => "/",
                async onCacheEntryAdded(
                    arg,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
                ) {
                    // create a websocket connection when the cache subscription starts
                    const ws = new WebSocket('ws://localhost:8080')
                    try {
                        // wait for the initial query to resolve before proceeding
                        await cacheDataLoaded

                        // when data is received from the socket connection to the server,
                        // if it is a message and for the appropriate channel,
                        // update our query result with the received message
                        const listener = (event: MessageEvent) => {
                            const data = JSON.parse(event.data);
                            updateCachedData(() => {
                                return data;
                            })
                        }

                        ws.addEventListener('message', listener)
                    } catch {
                        // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                        // in which case `cacheDataLoaded` will throw
                    }
                    // cacheEntryRemoved will resolve when the cache subscription is no longer active
                    await cacheEntryRemoved
                    // perform cleanup steps once the `cacheEntryRemoved` promise resolves
                    ws.close()
            },
        }),
    }),
});

export const {useGetMessagesQuery} = messages