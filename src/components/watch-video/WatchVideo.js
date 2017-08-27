import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import VideoWatch from './VideoWatch'
import RelatedVideos from './RelatedVideos'
import { getSingleVideo, getMoreVideos } from '../../controllers/VideoActions'

import './WatchVideo.css'

export default class WatchVideo extends Component {
  constructor(props) {
    super()
    this.state = {
      video: {},
      videosList: [],
    }
  }

  async loadData(videoInfos) {
    const video = await getSingleVideo(videoInfos.idVideo)
    PubSub.publish('update-video-watch', video)

    const videosList = await getMoreVideos(1,3)
    this.setState({ video })
    this.setState({ videosList })
  }

  componentDidMount = () => {
    const videoInfo = {
      idVideo: this.props.params.id,
    }
    this.loadData(videoInfo)
  }

  componentWillReceiveProps = nextProps => {
    const videoInfo = {
      idVideo: nextProps.params.id,
      rating: 0,
      closeDescription: true,
    }
    this.loadData(videoInfo)
  }

  render() {
    return (
      <main id="WatchVideo">
        <section className="main-video">
          {this.state.video.name
            ? <VideoWatch isOpen={true} video={this.state.video} />
            : `Loading...`}
        </section>
        <RelatedVideos videos={this.state.videosList} />
      </main>
    )
  }
}
