import express from 'express'
import { authController } from './@controller/authController'
import { categoriesController } from './@controller/categoriesController'
import { coursesController } from './@controller/coursesController'
import { episodesController } from './@controller/episodesController'
import { favoritesController } from './@controller/favoritesController'
import { likesController } from './@controller/likesController'
import { ensureAuth, ensureAuthViaQuery } from './@middlewares/auth'

const router = express.Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get('/categories', ensureAuth, categoriesController.index)
router.get('/categories/:id', ensureAuth, categoriesController.show)

router.get('/courses/featured', ensureAuth, coursesController.featured)
router.get('/courses/releases', coursesController.releases)
router.get('/courses/search', ensureAuth, coursesController.search)
router.get('/courses/:id', ensureAuth, coursesController.show)

router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream)

router.get('/favorites', ensureAuth, favoritesController.index)
router.post('/favorites', ensureAuth, favoritesController.save)
router.delete('/favorites/:id', ensureAuth, favoritesController.delete)

router.post('/likes', ensureAuth, likesController.save)
router.delete('/likes/:id', ensureAuth, likesController.delete)

export { router }
