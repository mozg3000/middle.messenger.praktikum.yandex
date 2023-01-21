import { Dispatch } from '../../core';
import { ChatApi } from '../../lib/api/chat/ChatApi';

type CreateChatPayload = {
  title: string
}

export const create = async (
  dispatch: Dispatch<AppState>, // eslint-disable-line no-undef
  state: AppState, // eslint-disable-line no-undef
  action: CreateChatPayload,
) => {
  dispatch({ isLoading: true })
  const client = new ChatApi
  try {
    await client.create(action)
    dispatch(getChats)
  } catch (e) {
    console.log(e)
  }
  dispatch({ isLoading: false })
}

export const getChats = async (dispatch: Dispatch<AppState>) => { // eslint-disable-line no-undef
  dispatch({ isLoading: true })
  const client = new ChatApi()
  try {
    const chats = await client.getChats()
    dispatch({ chats })
  } catch (e) {
    console.log(e)
  }
  dispatch({ isLoading: false })
}

type ChatterPayload = {
  users: Array<number>,
  chatId: number
}

export const addChatter = async (
  dispatch: Dispatch<AppState>, // eslint-disable-line no-undef
  state: AppState, // eslint-disable-line no-undef
  action: ChatterPayload,
) => {
  dispatch({ isLoading: true })
  let client = new ChatApi()
  try {
    await client.addChatter(action)
    client = new ChatApi()
    const users = await client.getUsers(action.chatId)
    dispatch({ users })
  } catch (e) {
    console.log(e)
  }
  dispatch({ isLoading: false })
}

export const getUsers = async (
  dispatch: Dispatch<AppState>, // eslint-disable-line no-undef
  state: AppState, // eslint-disable-line no-undef
  action: number,
) => {
  dispatch({ isLoading: true })
  const client = new ChatApi()
  try {
    const users = await client.getUsers(action)
    dispatch({ users })
  } catch (e) {
    console.log(e)
  }
  dispatch({ isLoading: false })
}

export const deleteChatter = async (
  dispatch: Dispatch<AppState>, // eslint-disable-line no-undef
  state: AppState, // eslint-disable-line no-undef
  action: ChatterPayload,
) => {
  dispatch({ isLoading: true })
  let client = new ChatApi()
  try {
    await client.deleteChatter(action)
    client = new ChatApi()
    const users = await client.getUsers(action.chatId)
    dispatch({ users })
  } catch (e) {
    console.log(e)
  }
  dispatch({ isLoading: false })
}

export const getToken = async (
  dispatch: Dispatch<AppState>, // eslint-disable-line no-undef
  state: AppState, // eslint-disable-line no-undef
  action: number,
) => {
  dispatch({ isLoading: true })
  dispatch({ token: null })
  const client = new ChatApi()
  try {
    const response = await client.getToken(action)
    dispatch({ token: response.token })
  } catch (e) {
    console.log(e)
  }
  dispatch({ isLoading: false })
}

type chatRoomPayload = {
  userId: number,
  chatId: number
}

export const chatRoom = async (
  dispatch: Dispatch<AppState>, // eslint-disable-line no-undef
  state: AppState, // eslint-disable-line no-undef
  { userId, chatId }: chatRoomPayload
) => {
  dispatch({ isLoading: true })
  dispatch({ token: null })
  let client = new ChatApi()
  try {

    if (state.intervalId) {
      clearInterval(state.intervalId)
      dispatch({ intervalId: null })
    }
    if (state.socket) {
      state.socket.close()
      dispatch({ socket: null })
    }
    const response = await client.getToken(chatId)
    const token = response.token
    dispatch({ token })
    const baseUrl = process.env.WS_ENDPOINT // eslint-disable-line no-undef
    console.log(baseUrl)
    const socket = new WebSocket(`wss://${baseUrl}/chats/${userId}/${chatId}/${token}`);
    const intervalId = setInterval(() => {
      socket.send(JSON.stringify({
        type: "ping"
      }))
    }, 30000)
    dispatch({ intervalId, socket })

    socket.addEventListener('message', event => {
      console.log('Получены данные', event.data)
      const message = JSON.parse(event.data)
      const type = message.type
      if (type === 'message') {
        state.messages.push(message)
        dispatch({ messages: state.messages })
      }
      if (type === 'get old') {
        state.messages.unshift(message)
        dispatch({ messages: state.messages })
      }
    });

    socket.addEventListener('error', event => {
      console.log('Ошибка', event.message)
    })

    socket.addEventListener('close', event => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    })
  } catch (e) {
    console.log(e)
  }
  dispatch({ isLoading: false })
}

export const sendMessage = async (
  dispatch: Dispatch<AppState>, // eslint-disable-line no-undef
  state: AppState, // eslint-disable-line no-undef
  action: string
) => {
  dispatch({ isLoading: true })
  state.socket.send(JSON.stringify({
    content: action,
    type: 'message'
  }))
  dispatch({ isLoading: false })
}
