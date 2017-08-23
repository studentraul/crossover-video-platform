import React, { Component } from 'react'
import { truncateString } from '../utils/string'
import { browserHistory } from 'react-router'
import ReactStars from 'react-stars'
import '../css/video.css'

class VideoHeader extends Component {
  render() {
    return (
      <header className="video__header">
        <p className="video__title">
          {this.props.name}
        </p>
      </header>
    )
  }
}

class VideoPlayer extends Component {
  render() {
    const url = this.props.url ? `http://localhost:3000/${this.props.url}` : ''
    return (
      <div className="video__player">
        <video controls>
          <source src={url} type="video/mp4" />
        </video>
      </div>
    )
  }
}

class VideoRating extends Component {
  calculateRating(ratings = [0]) {
    function getTotal() {
      return ratings.reduce(
        (iterator, currentValue) => (iterator += currentValue),
        0,
      )
    }

    return getTotal() / ratings.length
  }

  setRating(videoId, rating) {
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({
        videoId: videoId,
        rating: rating,
      }),
      headers: new Headers({ 'Content-type': 'application/json' }),
    }

    const userId = localStorage.getItem('auth-token')
    fetch(
      `http://localhost:3000/video/ratings?sessionId=${userId}`,
      requestInfo,
    )
      .then(res => res.json())
      .then(success => console.log(success))
      .catch(err => console.log(err))
  }

  render() {
    const ratingChanged = newRating => {
      this.setRating(this.props.videoId, newRating)
    }
    const ratings = this.props.ratings
    const edit = this.props.edit
    const isHalfRating = edit ? true : undefined

    return (
      <div className="video__rating">
        <ReactStars
          count={5}
          onChange={ratingChanged}
          value={edit ? 0 : this.calculateRating(ratings)}
          size={24}
          half={isHalfRating}
          edit={edit ? undefined : false}
          color2={'#ffd700'}
        />
      </div>
    )
  }
}

class VideoInfo extends Component {
  render() {
    const text = this.props.truncate
      ? truncateString(this.props.description, 110)
      : this.props.description
    return (
      <div className="video__description">
        <p className="video__description__title">
          {text}
        </p>
      </div>
    )
  }
}

export default class Video extends Component {
  openVideo() {
    browserHistory.push(`/watch/${this.props.video._id}`)
  }

  render() {
    const isMini = this.props.mini
    const isEditable = isMini ? false : true
    const needsToBeTruncate = this.props.truncate
    const video = this.props.video

    return (
      <div
        data-url=""
        className={`video ${isMini ? 'mini' : ''}`}
        onClick={isMini ? this.openVideo.bind(this) : null}
      >
        <VideoHeader name={video.name} />
        <VideoPlayer url={video.url} preload={isMini ? 'none' : ''} />
        <VideoRating
          ratings={video.ratings}
          videoId={video._id}
          edit={isEditable}
        />
        <VideoInfo
          description={video.description}
          truncate={needsToBeTruncate}
        />
      </div>
    )
  }
}

Video.defaultProps = {
  mini: true,
  truncate: true,
  video: {
    name: 'Some video',
    url: '',
    ratings: [],
    description: 'Some description',
  },
}
