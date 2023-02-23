import { setupServer } from 'msw/node';
import { rest } from 'msw'

const handlers = [//@ts-ignore
  rest.post( `${process.env.API_ENDPOINT}/auth/signin`, (req, res, ctx) => { //eslint-disable-line no-undef
    ctx.status(200)
    return res(ctx.json({
      id: 12345
    }))
  }),//@ts-ignore
  rest.get( `${process.env.API_ENDPOINT}/auth/user`, (req, res, ctx) => { //eslint-disable-line no-undef
    ctx.status(200)
    return res(ctx.json({
      id: 12345,
      login: 'luka',
      first_name: 'Joe',
      second_name: 'Dow',
      display_name: 'Dj',
      avatar: '/path/to/resource',
      phone: '+79999999999',
      email: 'go@fk.ys'
    }))
  }),//@ts-ignore
  rest.put( `${process.env.API_ENDPOINT}/user/profile`, (req, res, ctx) => { //eslint-disable-line no-undef
    ctx.status(200)
    return res(ctx.json({
      id: 12345,
      login: 'muka',
      first_name: 'Jone',
      second_name: 'Bone',
      display_name: 'jj',
      avatar: '/path/to/resource',
      phone: '+71111111111',
      email: 'go@fk.all'
    }))
  }),
]

export const server = setupServer(...handlers)
