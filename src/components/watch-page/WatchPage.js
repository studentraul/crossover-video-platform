import React, { Component } from 'react'
//import Video from '../Video'
import VideoWatch from './VideoWatch'
import RelatedVideos from './RelatedVideos'
import './WatchPage.css'

export default class WatchPage extends Component {
  constructor() {
    super()
    this.state = {
      video: {},
      videosList: [],
    }
  }

  getSingleVideo(idVideo) {
    const userId = localStorage.getItem('auth-token')
    return fetch(
      `http://localhost:3000/video?sessionId=${userId}&videoId=${idVideo}`,
    )
      .then(res => {
        if (res.ok) return res.json()
        else throw new Error('It was not possible to find this video')
      })
      .catch(err => console.error(err.message))
  }

  getMoreVideos() {
    const userId = localStorage.getItem('auth-token')
    return fetch(
      `http://localhost:3000/videos?sessionId=${userId}&skip=1&limit=3`,
    )
      .then(res => {
        if (res.ok) return res.json()
        else throw new Error('It was not possible to find this video')
      })
      .catch(err => console.error(err.message))
  }

  async loadData(videoInfos) {
    const video = await this.getSingleVideo(videoInfos.idVideo).then(
      json => json.data,
    )
    const videosList = await this.getMoreVideos().then(json => json.data)
    this.setState({ video })
    this.setState({ videosList })
  }

  componentWillMount = () => {
    const videoInfo = {
      idVideo: this.props.params.id,
    }
    this.loadData(videoInfo)
  }

  componentWillReceiveProps = nextProps => {
    const videoInfo = {
      idVideo: nextProps.params.id,
    }
    this.loadData(videoInfo)
  }

  render() {
    const video = this.state.video
    return (
      <main id="WatchPage">
        {/* <Video key={video._id} video={video} mini={false} /> */}
        <section className="main-video">
          <VideoWatch />
        </section>
        <RelatedVideos />
      </main>
    )
  }
}
