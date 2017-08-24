import { browserHistory } from 'react-router'
import ServerRoutes from '../config/ServerRoutes'
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
  const videoData = {
    videoId: videoId,
    rating: rating,
  }

  const requestInfo = {
    method: 'POST',
    body: JSON.stringify(videoData),
    headers: new Headers({ 'Content-type': 'application/json' }),
  }

  const userId = localStorage.getItem('auth-token')
  return fetch(routes.doReview(userId), requestInfo)
    .then(res => res.json())

}
