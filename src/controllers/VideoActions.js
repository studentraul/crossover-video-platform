import { browserHistory } from 'react-router'
import ServerRoutes from '../config/ServerRoutes'
import { getUserToken } from './SectionActions'

const routes = new ServerRoutes()

export const openVideoFromId = id => {
  if (id) {
    browserHistory.push(`/watch/${id}`)
  }
}

export const calculateRating = (ratings = [0]) => {
  const total = ratings.reduce(
    (iterator, currentValue) => (iterator += currentValue),
    0,
  )

  return total / ratings.length
}

export const getVideoUrl = url => {
  if (url) {
    const address = 'http://localhost:3000/'
    return address + url
  } else {
    throw new Error('Must be a valid url!')
  }
}

export const setRating = (videoId, rating) => {
  const requestInfo = {
    method: 'POST',
    body: JSON.stringify({
      videoId,
      rating,
    }),
    headers: new Headers({ 'Content-type': 'application/json' }),
  }

  return fetch(routes.doReview(getUserToken()), requestInfo).then(res =>
    res.json(),
  )
}

export const loadVideos = () => {
  return fetch(routes.videoList(getUserToken())).then(res => res.json())
}
