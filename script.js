class CustomPlayer extends HTMLElement {
  shadowRoot = null
  video = null
  wrapper = null
  playButton = null
  pauseButton = null
  progress = null
  fullScreenButton = null
  currentTime = 0
  duration = 0

  constructor() {
    super()

    this.shadowRoot = this.attachShadow({ mode: 'closed' })
    this.registerVideo()
    this.registerControls()
    this.render()
  }

  registerVideo() {
    this.video = document.createElement('video')

    this.video.setAttribute(
      'src',
      'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
      // 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
    )


    this.video.setAttribute('type', 'video/mp4')
    this.video.setAttribute('width', '250')

    this.video.className = 'video'

    this.video.addEventListener('loadedmetadata', () => {
      this.duration = this.video.duration;
    })
  }

  registerControls() {
    this.registerPlayButton()
    this.registerPauseButton()
    this.registerProgressElement()
    this.registerFullScreenButton()
  }

  play() {
    this.video.addEventListener('timeupdate', () => {
      this.currentTime = this.video.currentTime
      const part = parseInt((this.currentTime / this.duration) * 100)
      this.progress.value = part
    });

    this.video.play()

  }

  pause() {
    this.video.pause()
  }

  registerPlayButton() {
    this.playButton = document.createElement('button')

    this.playButton.innerText = 'Play'

    this.playButton.className = 'button button__play'

    this.playButton.addEventListener('click', (event) => {
      this.play()
    })
  }

  registerPauseButton() {
    this.pauseButton = document.createElement('button')

    this.pauseButton.innerText = 'Pause'

    this.pauseButton.className = 'button button__pause'

    this.pauseButton.addEventListener('click', (event) => {
      this.pause()
    })
  }

  registerFullScreenButton() {
    this.fullScreenButton = document.createElement('button')

    this.fullScreenButton.innerText = 'FullScreen'

    this.fullScreenButton.className = 'button button__fullscreen'

    this.fullScreenButton.addEventListener('click', (event) => {
      this.goFullScreen()
    })
  }

  registerProgressElement() {
    this.progress = document.createElement('input')

    this.progress.setAttribute('type', 'range')
    this.progress.setAttribute('min', 0)
    this.progress.setAttribute('value', 0)
    this.progress.setAttribute('max', 100)

    this.progress.className = 'progress'

    this.progress.addEventListener('change', () => {
      this.goToTimePercent(this.progress.value)
    })
  }

  goToTimePercent(percent) {
    this.video.currentTime = this.duration * percent / 100
  }

  addStyles() {
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'player.css');
    linkElem.setAttribute('type', 'text/css');

    this.shadowRoot.appendChild(linkElem);
  }

  goFullScreen() {
    if (!document.fullscreenElement) {
      if (this.wrapper.requestFullscreen) {
        this.wrapper.requestFullscreen().catch(e => { console.log(e) })
      } else if (this.video.msRequestFullscreen) {
        this.wrapper.msRequestFullscreen().catch(e => { console.log(e) })
      } else if (this.video.mozRequestFullScreen) {
        this.wrapper.mozRequestFullScreen().catch(e => { console.log(e) })
      } else if (this.video.webkitRequestFullscreen) {
        console.log('IOS!!!')
        this.wrapper.webkitRequestFullscreen().catch(e => { console.log(e) })
      }
    } else {
      document.exitFullscreen() || document.webkitExitFullscreen();
    }
  }

  exitFullscreen() {
    document.exitFullscreen() || document.webkitExitFullscreen();
  }

  render() {
    const wrapper = document.createElement('div')
    wrapper.className = 'wrapper'
    wrapper.appendChild(this.video)
    wrapper.appendChild(this.progress)
    wrapper.appendChild(this.playButton)
    wrapper.appendChild(this.pauseButton)
    wrapper.appendChild(this.fullScreenButton)
    this.wrapper = wrapper
    this.addStyles()
    this.shadowRoot.append(this.wrapper)
  }
}

customElements.define('custom-player', CustomPlayer)
