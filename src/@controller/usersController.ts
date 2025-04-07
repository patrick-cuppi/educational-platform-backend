import type { Response } from 'express'
import type { AuthenticatedRequest } from '../@middlewares/auth'
import { userService } from '../@services/userService'

export const usersController = {
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
