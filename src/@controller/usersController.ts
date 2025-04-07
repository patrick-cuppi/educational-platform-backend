import type { Response } from 'express'
import type { AuthenticatedRequest } from '../@middlewares/auth'
import { userService } from '../@services/userService'

export const usersController = {
  show: async (req: AuthenticatedRequest, res: Response) => {
    try {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      const currentUser = req.user!

      return res.json(currentUser)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const { id } = req.user!
    const { firstName, lastName, phone, birth, email } = req.body

    try {
      const updatedUser = await userService.update(id, { firstName, lastName, phone, birth, email })

      return res.json(updatedUser)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  watching: async (req: AuthenticatedRequest, res: Response) => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const { id } = req.user!

    try {
      const watching = await userService.getKeepWatchingList(id)

      return res.json(watching)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },
}
