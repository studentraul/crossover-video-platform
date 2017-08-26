import React, { Component } from 'react'
import ReactStars from 'react-stars'

import { truncateString, cleanVideoName } from '../../utils/string'
import {
  openVideoFromId,
  calculateRating,
} from '../../controllers/VideoActions'

import './VideoHome.css'

class VideoHeader extends Component {
  render() {
    const { name, openVideo } = this.props
    return (
      <h2 className="title" onClick={openVideo}>
        {cleanVideoName(name)}
      </h2>
    )
  }
}

class VideoPlayer extends Component {
  render() {
    const url = this.props.url ? `http://localhost:3000/${this.props.url}` : ''
    return (
      <div className="midia">
        <video className="midia__video">
          <source src={url} type="video/mp4" />
        </video>
      </div>
    )
  }
}

class VideoRating extends Component {
  render() {
    const { ratings } = this.props

    return (
      <div className="infos__ratings">
        <ReactStars
          count={5}
          value={calculateRating(ratings)}
          size={24}
          edit={false}
          color2={'#ffd700'}
        />
      </div>
    )
  }
}

class VideoDescription extends Component {
  render() {
    const text = truncateString(this.props.description, 110)
    return (
      <p className="infos__description">
        {text}
      </p>
    )
  }
}

export default class VideoHome extends Component {
  openVideo() {
    openVideoFromId(this.props.video._id)
  }

  render() {
    const { name, url, ratings, description } = this.props.video

    return (
      <div id="VideoHome">
        <VideoHeader name={name} openVideo={this.openVideo.bind(this)} />
        <VideoPlayer url={url} />
        <div className="infos">
          <VideoRating ratings={ratings} />
          <VideoDescription description={description} />
        </div>
      </div>
    )
  }
}
