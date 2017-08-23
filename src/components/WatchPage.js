import React, { Component } from 'react'
import Video from './Video'
import '../css/watchPage.css'

export default class WatchPage extends Component {
  constructor() {
    super()
    this.state = {
      mainVideo: {
        _id: '',
        name: '',
        description: '',
        url: '',
        rating: 0,
      },
    }
  }

  getSingleVideo() {
    const userId = localStorage.getItem('auth-token')
    return fetch(
      `http://localhost:3000/video?sessionId=${userId}&videoId=${this.props
        .params.id}`,
    )
  }

  componentWillMount = () => {
    this.getSingleVideo()
      .then(res => {
        if (res.ok) return res.json()
        else throw new Error('It was not possible to find this video')
      })
      .then(video => this.setState({mainVideo: video.data}))
      .catch(err => console.error(err.message))

      console.log(this.setState.mainVideo)
  }

  render() {
    return (
      <main className="container">
        <Video video={this.state.mainVideo} mini={false}/>
        <div className="related-list">
        
        </div>
      </main>
    )
  }
}
