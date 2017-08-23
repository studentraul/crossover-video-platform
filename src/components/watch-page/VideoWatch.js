import React, { Component } from 'react'
import ReactStars from 'react-stars'
import './VideoWatch.css'

export default class VideoWatch extends Component {
  setRating(videoId, rating) {
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({
        videoId: videoId,
        rating: rating,
      }),
      headers: new Headers({ 'Content-type': 'application/json' }),
    }

    const userId = localStorage.getItem('auth-token')
    fetch(
      `http://localhost:3000/video/ratings?sessionId=${userId}`,
      requestInfo,
    )
      .then(res => res.json())
      .then(success => console.log(success))
      .catch(err => console.log(err))
  }

  render() {
    const ratingChanged = newRating => {
      this.setRating(this.props.videoId, newRating)
    }

    return (
      <div id="VideoWatch">
        <div className="midia">
          <video className="midia__video" controls>
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
              onChange={ratingChanged}
              value={5}
              half={false}
              size={24}
              color2={'#ffd700'}
            />
          </div>
          <p className="video-infos__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quas
            perspiciatis itaque ipsa quis? Animi quidem, velit quod dolorem
            recusandae, nam architecto numquam officiis voluptates sapiente a!
            Amet quis ex dignissimos soluta similique recusandae vero ullam
            veniam molestiae nihil in ipsa impedit fuga quisquam eum a, mollitia
            nobis eius iste eveniet vel repellat, totam voluptatum. Pariatur
            possimus ex minima itaque corrupti, vero ut quaerat nobis nisi natus
            dicta, incidunt beatae, dolorum perferendis? Voluptatum excepturi
            ullam quo asperiores, placeat ex reiciendis ea eum? Nihil, maxime.
            Quibusdam, aut delectus autem voluptatibus maxime id nemo, est ipsa,
            optio iusto quod rerum modi ipsum.
          </p>
        </div>
      </div>
    )
  }
}
