import { Dispatch } from '../../core';
import { ChatApi } from '../../lib/api/chat/ChatApi';
import { Action } from '../../core/Store'
import AppState from '../../../typings/app';

type CreateChatPayload = {
  title: string
}

export const create: Action<AppState, CreateChatPayload> = async (dispatch, state, action) => {// eslint-disable-line no-undef
  // dispatch({ isLoading: true })
  const client = new ChatApi
  try {
    await client.create(action)
    dispatch(getChats)
  } catch (e) {
    console.log(e)
  }
  // dispatch({ isLoading: false })
}

export const getChats: Pick<Action<AppState, null>, 'dispatch'> = async (dispatch: Dispatch<AppState>) => { // eslint-disable-line no-undef
  // dispatch({ isLoading: true })
  const client = new ChatApi()
  try {
    const chats = await client.getChats()
    dispatch({ chats })
  } catch (e) {
    console.log(e)
  }
  // dispatch({ isLoading: false })
}

type ChatterPayload = {
  users: Array<number>,
  chatId: number
}

export const addChatter: Action<AppState, ChatterPayload> = async (dispatch, state, action) => {
  // dispatch({ isLoading: true })
  let client = new ChatApi()
  try {
    await client.addChatter(action)
    client = new ChatApi()
    const users = await client.getUsers(action.chatId)
    dispatch({ users })
  } catch (e) {
    console.log(e)
  }
  // dispatch({ isLoading: false })
}

export const getUsers: Action<AppState, number> = async (dispatch, state, action) => {
  // dispatch({ isLoading: true })
  const client = new ChatApi()
  try {
    const users = await client.getUsers(action)
    dispatch({ users })
  } catch (e) {
    console.log(e)
  }
  // dispatch({ isLoading: false })
}

export const deleteChatter: Action<AppState, ChatterPayload> = async (dispatch, state, action) => {
  // dispatch({ isLoading: true })
  let client = new ChatApi()
  try {
    await client.deleteChatter(action)
    client = new ChatApi()
    const users = await client.getUsers(action.chatId)
    dispatch({ users })
  } catch (e) {
    console.log(e)
  }
  // dispatch({ isLoading: false })
}

type chatRoomPayload = {
  userId: number,
  chatId: number
}

export const chatRoom: Action<AppState, chatRoomPayload> = async (dispatch, state, { userId, chatId }) => {
  // dispatch({ isLoading: true })
  // dispatch({ token: null })
  let client = new ChatApi()
  try {
    if (window.store.getState().intervalId) {
      clearInterval(window.store.getState().intervalId)
      state.socket.close()
      dispatch({ intervalId: null, socket: null, messages: [] })
    }
    const response = await client.getToken(chatId)
    const token = response.token
    dispatch({ token })
    const baseUrl = process.env.WS_ENDPOINT // eslint-disable-line no-undef
    const socket = new WebSocket(`wss://${baseUrl}/chats/${userId}/${chatId}/${token}`);
    const intervalId = setInterval(() => {
      socket.send(JSON.stringify({
        type: "ping"
      }))
    }, 30000)
    dispatch({ intervalId, socket })

    socket.addEventListener('open', () => { // eslint-disable-line no-unused-vars
      console.log('Connection opened')
      socket.send(JSON.stringify({
        content: 0,
        type: 'get old'
      }))
    })
    socket.addEventListener('message', event => {
      const messages = JSON.parse(event.data)
      if (Array.isArray(messages) && messages.length) {
        const id = messages[messages.length - 1].id
        dispatch({ firstMessage: id, messages: [...messages.reverse(), ...window.store.getState().messages] })
        socket.send(JSON.stringify({
          content: id,
          type: 'get old'
        }))
      } else {
        const type = messages.type
        if (type === 'message') {
          state.messages.push(messages)
          dispatch({ messages: [...window.store.getState().messages, messages] })
        }
      }
      const d = document.getElementById('scroll-here')
      d.scrollIntoView()
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
  // dispatch({ isLoading: false })
}

export const sendMessage: Action<AppState, string> = async (dispatch, state, action) => {
  // dispatch({ isLoading: true })
  state.socket.send(JSON.stringify({
    content: action,
    type: 'message'
  }))
  // dispatch({ isLoading: false })
}

export const deleteChat: Action<AppState, number> = async (dispatch, state, action) => {
  dispatch({ isLoading: true })
  const client = new ChatApi()
  try {
    await client.deleteChat({
      chatId: action
    })
    const chats = state.chats.filter(c => {
      return c.id != action
    })
    dispatch({ chats })
  } catch (e) {
    console.log(e)
  }
  dispatch({ isLoading: false })
}
