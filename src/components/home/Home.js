import React, { Component } from 'react'
import VideoCard from '../common/VideoCard'
import './Home.css'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class Home extends Component {
  constructor() {
    super()
    this.state = { videos: [] }
  }

  componentDidMount() {
    const token = localStorage.getItem('auth-token')
    fetch(`http://localhost:3000/videos?sessionId=${token}`)
      .then(res => res.json())
      .then(videos => this.setState({ videos: videos.data }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="transaction-default"
        component="main"
        id="Home"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {this.state.videos.map(video =>
          <VideoCard key={video._id} video={video} />,
        )}
      </ReactCSSTransitionGroup>
    )
  }
}
