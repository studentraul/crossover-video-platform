import React, { Component } from 'react'
import ReactStars from 'react-stars'
import './RelatedVideos.css'
import { cleanVideoName } from '../../utils/string'

import {
  openVideoFromId,
  calculateRating,
  getVideoUrl,
} from '../../controllers/VideoActions'

class Video extends Component {
  render() {
    const { _id, url, name, ratings } = this.props.video

    const openVideo = () => {
      openVideoFromId(_id)
    }

    return (
      <div onClick={openVideo} className="video">
        <div className="midia">
          <video className="midia__video">
            <source src={getVideoUrl(url)} type="video/mp4" />
          </video>
        </div>
        <div className="video-infos">
          <p className="video-infos__title">
            {cleanVideoName(name)}
          </p>
          <div className="video-infos__ratings">
            <ReactStars
              count={5}
              value={calculateRating(ratings)}
              size={24}
              edit={false}
              color2={'#ffd700'}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default class RelatedVideos extends Component {
  render() {
    const { videos } = this.props

    return (
      <div id="RelatedVideo">
        {videos.map(video => {
          return <Video key={video._id} video={video} />
        })}
      </div>
    )
  }
}
