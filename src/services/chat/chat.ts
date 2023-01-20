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
