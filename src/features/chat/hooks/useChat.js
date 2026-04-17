import { initializeSocketConnection } from "../service/chat.socket"
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api";
import { setChats, removeChat, setCurrentChatId,  setLoading, setError, createNewChat, addNewMessage, addMessages } from "../chat.slice";
import { useDispatch } from "react-redux";


export const useChat = () => {

    const dispatch = useDispatch()


    async function handleSendMessage({ message, chatId }) {
        try {
            dispatch(setLoading(true))

            if (chatId) {
                dispatch(addNewMessage({
                    chatId,
                    content: message,
                    role: "user",
                }))
            }

            const data = await sendMessage({ message, chatId })
            const { chat, aiMessage } = data

            if (!chatId) {
                dispatch(createNewChat({
                    chatId: chat._id,
                    title: chat.title,
                }))

                dispatch(addNewMessage({
                    chatId: chat._id,
                    content: message,
                    role: "user",
                }))
            }

            dispatch(addNewMessage({
                chatId: chatId || chat._id,
                content: aiMessage.content,
                role: aiMessage.role,
            }))

            dispatch(setCurrentChatId(chat._id))
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to send message"))
            throw error
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetChats() {
        dispatch(setLoading(true))
        const data = await getChats()
        const { chats } = data
        dispatch(setChats(chats.reduce((acc, chat) => {
            acc[ chat._id ] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt,
            }
            return acc
        }, {})))
        dispatch(setLoading(false))
    }

    async function handleOpenChat(chatId, chats) {

        console.log(chats[ chatId ]?.messages.length)

        if (chats[ chatId ]?.messages.length === 0) {
            const data = await getMessages(chatId)
            const { messages } = data

            const formattedMessages = messages.map(msg => ({
                content: msg.content,
                role: msg.role,
            }))

            dispatch(addMessages({
                chatId,
                messages: formattedMessages,
            }))
        }
        dispatch(setCurrentChatId(chatId))
    }

    async function handleDeleteChat(chatId, chats, currentChatId) {
        try {
            await deleteChat(chatId)
            dispatch(removeChat(chatId))

            if (currentChatId === chatId) {
                const nextChatId = Object.keys(chats).find((id) => id !== chatId) || null
                dispatch(setCurrentChatId(nextChatId))
            }
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to delete chat"))
        }
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
        handleDeleteChat
    }

}