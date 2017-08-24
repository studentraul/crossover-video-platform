import React, { Component } from 'react'
import ReactStars from 'react-stars'
import {cleanVideoName} from '../../utils/string'
import {getVideoUrl} from '../../controllers/VideoActions'
import './VideoWatch.css'

class Midia extends Component {
  render() {
    const url = this.props.video.url ? getVideoUrl(this.props.video.url) : '';
    console.log(this.props.video)
    return (
      <div className="midia">
        <video className="midia__video" controls autoPlay>
          <source
            src={url}
            type="video/mp4"
          />
        </video>
      </div>
    )
  }
}

class Ratting extends Component {
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

    return (
      <div className="video-infos__ratings">
        <ReactStars
          count={5}
          onChange={ratingChanged}
          value={0}
          half={false}
          size={24}
          color2={'#ffd700'}
        />
      </div>
    )
  }
}

class Description extends Component {
  render() {
    const text = this.props.video.description
    return (
      <p className="video-infos__description">
        {text}
      </p>
    )
  }
}

export default class VideoWatch extends Component {
  render() {
    const video = this.props.video

    return (
      <div id="VideoWatch">
        <Midia video={video} />
        <div className="video-infos">
          <p className="video-infos__title">{cleanVideoName(video.name)}</p>
          <Ratting video={video} />
          <Description video={video} />
        </div>
      </div>
    )
  }
}
