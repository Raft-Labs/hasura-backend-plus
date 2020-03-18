import { Request, Response } from 'express'
import { asyncWrapper, verifyJwt } from '@shared/helpers'

import Boom from '@hapi/boom'
import { deleteUserById } from '@shared/queries'
import { request } from '@shared/request'

async function remove({ headers }: Request, res: Response): Promise<unknown> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const decodedToken = await verifyJwt(headers.authorization!)
  const user_id = decodedToken['https://hasura.io/jwt/claims']['x-hasura-user-id']

  try {
    await request(deleteUserById, { user_id })
  } catch (err) {
    throw Boom.badImplementation()
  }

  return res.status(204).send()
}

export default asyncWrapper(remove)