import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import VideoCard from '../common/VideoCard'
import { loadVideos } from '../../controllers/VideoActions'

import './Home.css'

export default class Home extends Component {
  constructor() {
    super()
    this.state = { videos: [] }
  }

  componentDidMount() {
    loadVideos()
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
