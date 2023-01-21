import { BaseApi } from '../BaseApi';

type CreateChatData = {
  title: string
}

type ChatterData = {
  users: Array<number>,
  chatId: number
}

class ChatApi extends BaseApi {
  create(data: CreateChatData) {
    return this.client.request(
      '/chats',
      {
        method: 'POST',
        data
      }
    )
  }
  getChats() {
    return this.client.request('/chats')
  }
  addChatter(data: ChatterData) {
    return this.client.request(
      '/chats/users',
      {
        method: 'PUT',
        data
      }
    )
  }

  getUsers(id: number) {
    return this.client.request(`/chats/${id}/users`)
  }

  deleteChatter(data: ChatterData) {
    return this.client.request(
      '/chats/users',
      {
        method: 'DELETE',
        data
      }
    )
  }

  getToken(id: number) {
    return this.client.request(
      `/chats/token/${id}`,
      {
        method: 'POST'
      }
    )
  }
}

export { ChatApi }
