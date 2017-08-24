import React, { Component } from 'react'
import VideoCard from '../common/VideoCard'
import './Home.css'

export default class Home extends Component {
  constructor() {
    super()
    this.state = { videos: [] }
  }

  componentDidMount() {
    const token = localStorage.getItem('auth-token')
    fetch(
      `http://localhost:3000/videos?sessionId=${token}`,
    )
      .then(res => res.json())
      .then(videos => this.setState({ videos: videos.data }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <main id="Home">
        {this.state.videos.map(video => <VideoCard key={video._id} video={video}/>)}
      </main>
    )
  }
}
