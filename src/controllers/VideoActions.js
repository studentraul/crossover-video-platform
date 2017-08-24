import { browserHistory } from 'react-router'

export const openVideoFromId = id => {
  if(id){
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

export const getVideoUrl = (url) => {
  if(url){
    const address = 'http://localhost:3000/'
    return address+url
  }
  else{
    throw new Error('Must be a valid url!')
  }

}