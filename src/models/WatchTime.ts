import { DataTypes, type Model } from 'sequelize'
import { sequelize } from '../database'

export interface WatchTime {
  seconds: number
  userId: number
  episodeId: number
}

export interface WatchTimeInstance extends Model<WatchTime>, WatchTime {}

export const WatchTime = sequelize.define<WatchTimeInstance, WatchTime>('WatchTime', {
  seconds: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  episodeId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: { model: 'episodes', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
})
