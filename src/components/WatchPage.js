import React, { Component } from 'react'
import Video from './Video'
import '../css/watchPage.css'

export default class WatchPage extends Component {
  constructor() {
    super()
    this.state = {
      video: {},
    }
  }

  getSingleVideo() {
    const userId = localStorage.getItem('auth-token')
    return fetch(
      `http://localhost:3000/video?sessionId=${userId}&videoId=${this.props
        .params.id}`,
    )
      .then(res => {
        if (res.ok) return res.json()
        else throw new Error('It was not possible to find this video')
      })
      .catch(err => console.error(err.message))
  }
  componentWillMount = () => {
    this.getSingleVideo().then(json => this.setState({ video: json.data }))
  }

  render() {
    const video = this.state.video
    return (
      <main id="WatchPage">
        <Video key={video._id} video={video} mini={false} />
        <div className="related-list" />
      </main>
    )
  }
}
