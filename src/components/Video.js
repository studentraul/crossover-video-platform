import React, { Component } from 'react'
import { truncateString } from '../utils/string'
import { browserHistory } from 'react-router'
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
  render() {
    return (
      <div className="video__rating">
        {/* <i className="star  fa fa-star" aria-hidden="true" />
            <i className="star is-colored fa fa-star" aria-hidden="true" />
            <i className="star is-colored fa fa-star" aria-hidden="true" />
            <i className="star is-colored fa fa-star" aria-hidden="true" />
            <i className="star fa fa-star" aria-hidden="true" /> */}
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
        <VideoRating ratings={video.ratings} />
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
