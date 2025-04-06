import fs from 'node:fs'
import path from 'node:path'
import type { Response } from 'express'
import { WatchTime } from '../models'

export const episodeService = {
  streamEpisodeToResponse: (res: Response, videoUrl: string, range: string | undefined) => {
    const filePath = path.join(__dirname, '..', '..', 'uploads', videoUrl)
    const fileStat = fs.statSync(filePath)

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-')

      const start = Number.parseInt(parts[0], 10)
      const end = parts[1] ? Number.parseInt(parts[1], 10) : fileStat.size - 1

      const chunkSize = end - start + 1

      const file = fs.createReadStream(filePath, { start, end })

      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      }

      res.writeHead(206, head)

      file.pipe(res)
    }

    if (!range) {
      const head = {
        'Content-Length': fileStat.size,
        'Content-Type': 'video/mp4',
      }

      res.writeHead(200, head)

      fs.createReadStream(filePath).pipe(res)
    }
  },

  getWatchTime: async (userId: number, episodeId: number) => {
    const watchTime = await WatchTime.findOne({
      attributes: ['seconds'],
      where: {
        userId,
        episodeId,
      },
    })

    return watchTime
  },

  setWatchTime: async ({ userId, episodeId, seconds }: WatchTime) => {
    const watchTimeAlreadyExists = await WatchTime.findOne({
      where: {
        userId,
        episodeId,
      },
    })

    if (watchTimeAlreadyExists) {
      watchTimeAlreadyExists.seconds = seconds
      await watchTimeAlreadyExists.save()
      return watchTimeAlreadyExists
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      const watchTime = await WatchTime.create({
        userId,
        episodeId,
        seconds,
      })

      return watchTime
    }
  },
}
