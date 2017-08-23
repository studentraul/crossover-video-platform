import React, { Component } from 'react'
import ReactStars from 'react-stars'
import './RelatedVideos.css'

class Video extends Component {
  render () {
    return (
      <div>
        <div className="midia">
            <video className="midia__video">
              <source
                src="https://video-ams3-1.xx.fbcdn.net/v/t43.1792-2/20958471_114096075987204_8430579202100559872_n.mp4?efg=eyJybHIiOjE3OTUsInJsYSI6MTAyNCwidmVuY29kZV90YWciOiJzdmVfaGQifQu00253Du00253D&rl=1795&vabr=1197&oh=7b548158a43c65ae6910884abd7be3fe&oe=599DD8BD"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="video-infos">
            <p className="video-infos__title">Meu Video</p>
            <div className="video-infos__ratings">
              <ReactStars
                count={5}
                onChange={() => console.log('oi')}
                value={5}
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
    return (
        <div id="RelatedVideo">
          <Video/>
          <Video/>
          <Video/>
          <Video/>
          <Video/>
        </div>
    )
  }
}
