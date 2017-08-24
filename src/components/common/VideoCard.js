import React, { Component } from 'react'
import { truncateString, cleanVideoName } from '../../utils/string'
import ReactStars from 'react-stars'
import './VideoCard.css'

import {openVideoFromId,calculateRating} from '../../controllers/VideoActions'

class VideoHeader extends Component {
  render() {
    return (
      <h2 className="title">
        {cleanVideoName(this.props.name)}
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
    const ratings = this.props.ratings
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

export default class VideoCard extends Component {
  openVideo() {
    openVideoFromId(this.props.video._id)
  }

  render() {
    const video = this.props.video

    return (
      <div id="VideoCard" onClick={this.openVideo.bind(this)}>
        <VideoHeader name={video.name} />
        <VideoPlayer url={video.url} />
        <div className="infos">
          <VideoRating ratings={video.ratings} />
          <VideoDescription description={video.description} />
        </div>
      </div>
    )
  }
}

VideoCard.defaultProps = {
  mini: true,
  truncate: true,
  video: {
    name: 'Some video',
    url: '',
    ratings: [],
    description: 'Some description',
  },
}
