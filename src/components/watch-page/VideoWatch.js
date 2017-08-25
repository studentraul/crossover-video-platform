import React, { Component } from 'react'
import ReactStars from 'react-stars'
import { cleanVideoName } from '../../utils/string'
import { getVideoUrl, setRating } from '../../controllers/VideoActions'
import './VideoWatch.css'

import { Collapse } from 'react-collapse'

import PubSub from 'pubsub-js'

class Midia extends Component {
  //This function reload VIDEO element
  //when it receive a new value
  reload() {
    return this.videoRef ? this.videoRef.load() : null
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

class Rating extends Component {
  render() {
    const { changeRate, rating } = this.props
    return (
      <div className="video-infos__ratings">
        <ReactStars
          count={5}
          onChange={changeRate}
          value={rating}
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
    const isOpened = this.props.isOpened

    return (
      <Collapse isOpened={isOpened}>
        <p className="video-infos__description">
          {text}
        </p>
      </Collapse>
    )
  }
}

export default class VideoWatch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      video: props.video,
      rating: 0,
      isOpened: false,
    }
  }

  ratingChanged = newRating => {
    setRating(this.props.video._id, newRating)
      .then(success => this.changeRating(newRating))
      .catch(err => {
        console.log(err)
      })
  }

  changeRating = rating => this.setState({ rating })

  updateVideo(topic, video) {
    this.setState({ video, isOpened: false, rating: 0 })
  }

  componentDidMount() {
    PubSub.subscribe('update-video-watch', this.updateVideo.bind(this))
  }

  handleOpenDescription() {
    const openState = this.state.isOpened ? false : true
    this.setState({ isOpened: openState })
  }

  render() {
    const { video, rating, isOpened } = this.state

    return (
      <div id="VideoWatch">
        <Midia video={video} />
        <div className="video-infos">
          <p
            className="video-infos__title"
            onClick={() => this.handleOpenDescription()}
          >
            {cleanVideoName(video.name)}
          </p>
          <Rating
            rating={rating}
            video={video}
            changeRate={this.ratingChanged}
          />
          <Description video={video} isOpened={isOpened} />
        </div>
      </div>
    )
  }
}
