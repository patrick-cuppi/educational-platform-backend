import type { Request, Response } from 'express'
import type { AuthenticatedRequest } from '../@middlewares/auth'
import { episodeService } from '../@services/episodeService'

export const episodesController = {
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query

    try {
      if (typeof videoUrl !== 'string') throw new Error('type videoUrl incorrect')

      const range = req.headers.range

      episodeService.streamEpisodeToResponse(res, videoUrl, range)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  getWatchTime: async (req: AuthenticatedRequest, res: Response) => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const userId = req.user!.id
    const episodeId = req.params.id

    try {
      const watchTime = await episodeService.getWatchTime(userId, Number(episodeId))

      return res.json(watchTime)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  setWatchTime: async (req: AuthenticatedRequest, res: Response) => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const userId = req.user!.id
    const episodeId = Number(req.params.id)
    const { seconds } = req.body

    try {
      const watchTime = await episodeService.setWatchTime({
        userId,
        episodeId,
        seconds,
      })

      return res.json(watchTime)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },
}
