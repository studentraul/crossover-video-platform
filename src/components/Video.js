import React, { Component } from 'react'
import { truncateString } from '../utils/string'

class VideoHeader extends Component {
  render() {
    return (
      <header className="video__header">
        <p className="video__title">
          {this.props.video.name}
        </p>
      </header>
    )
  }
}

class VideoPlayer extends Component {
  render() {
    return (
      <div className="video__player">
        <video controls>
          <source
            src={`http://localhost:3000/${this.props.video.url}`}
            type="video/mp4"
          />
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
    return (
      <p className="video__description">
        {truncateString(this.props.video.description, 110)}
      </p>
    )
  }
}

export default class Video extends Component {
  render() {
    return (
      <div data-url="" className="video mini">
        <VideoHeader video={this.props.video} />
        <VideoPlayer video={this.props.video} />
        <VideoRating video={this.props.video} />
        <VideoInfo video={this.props.video} />
      </div>
    )
  }
}
