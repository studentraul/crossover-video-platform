import React, { Component } from 'react'
import ReactStars from 'react-stars'
import { cleanVideoName } from '../../utils/string'
import { getVideoUrl } from '../../controllers/VideoActions'
import './VideoWatch.css'

import PubSub from 'pubsub-js'

class Midia extends Component {
  reload() {
    this.videoRef ? this.videoRef.load() : null
  }

  componentDidMount() {
    PubSub.subscribe(
      'update-video-watch',
      function(topic, video) {
        this.reload()
      }.bind(this),
    )
  }

  render() {
    const url = this.props.video.url ? getVideoUrl(this.props.video.url) : ''

    return (
      <div className="midia">
        <video
          className="midia__video"
          controls
          ref={video => (this.videoRef = video)}
        >
          <source src={url} type="video/mp4" />
        </video>
      </div>
    )
  }
}

class Ratting extends Component {
  setRating(videoId, rating) {
    
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
  constructor(props) {
    super(props)
    this.state = {
      video: props.video,
    }
  }

  updateVideo(topic, video) {
    this.setState({ video })
  }

  componentDidMount() {
    PubSub.subscribe('update-video-watch', this.updateVideo.bind(this))
  }

  render() {
    const video = this.state.video
    return (
      <div id="VideoWatch">
        <Midia video={video} />
        <div className="video-infos">
          <p className="video-infos__title">
            {cleanVideoName(video.name)}
          </p>
          <Ratting video={video} />
          <Description video={video} />
        </div>
      </div>
    )
  }
}
