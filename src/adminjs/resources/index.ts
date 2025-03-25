import type { ResourceWithOptions } from 'adminjs'
import { Category, Course, Episode, User } from '../../models'
import { categortyResourceOptions } from './category'
import { courseResourceOptions } from './course'
import { episodeResourceOptions } from './episode'
import { userResourceOptions } from './user'

export const adminJsResource: ResourceWithOptions[] = [
  {
    resource: Category,
    options: categortyResourceOptions,
  },
  {
    resource: Course,
    options: courseResourceOptions,
  },
  {
    resource: Episode,
    options: episodeResourceOptions,
  },
  {
    resource: User,
    options: userResourceOptions,
  },
]
