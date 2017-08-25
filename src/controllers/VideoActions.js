import { browserHistory } from 'react-router'
import ServerRoutes from '../config/ServerRoutes'
import SessionActions from './SessionActions'

const routes = new ServerRoutes()
const session = new SessionActions()

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

  return fetch(routes.doReview(session.userToken), requestInfo).then(res =>
    res.json(),
  )
}

export const loadVideos = () => {
  return fetch(routes.videoList(session.userToken)).then(res => res.json())
}

export const getSingleVideo = videoId => {
  return fetch(routes.singleVideo(session.userToken, videoId))
    .then(res => {
      if (res.ok) return res.json()
      else throw new Error('It was not possible to find this video')
    })
    .then(json => json.data)
}

export const getMoreVideos = (skip, limit) => {
  const url = routes.videoList(session.userToken, skip, limit)
  return fetch(url)
    .then(res => {
      if (res.ok) return res.json()
      else throw new Error('It was not possible to find this video')
    })
    .then(json => json.data)
}
