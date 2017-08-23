import React, { Component } from 'react'
import { truncateString, cleanVideoName } from '../../utils/string'
import { browserHistory } from 'react-router'
import ReactStars from 'react-stars'
import './Video.css'

class VideoHeader extends Component {
  render() {
    return (
      <header className="video__header">
        <p className="video__title">
          {cleanVideoName(this.props.name)}
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
        <video>
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

  render() {
    const ratings = this.props.ratings
    return (
      <div className="video__rating">
        <ReactStars
          count={5}
          value={this.calculateRating(ratings)}
          size={24}
          edit={false}
          color2={'#ffd700'}
        />
      </div>
    )
  }
}

class VideoInfo extends Component {
  render() {
    const text = truncateString(this.props.description, 30)
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
    const video = this.props.video

    return (
      <div id="Video" onClick={this.openVideo.bind(this)}>
        <VideoHeader name={video.name} />
        <VideoPlayer url={video.url} />
        <VideoRating ratings={video.ratings} />
        <VideoInfo description={video.description} />
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
