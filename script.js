class CustomPlayer extends HTMLElement {

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'closed' })
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
    // this.video.setAttribute('width', '250')

    this.video.className = 'video'

    this.video.addEventListener('loadedmetadata', () => {
      this.duration = this.video.duration
    })
  }

  registerControls() {
    this.registerPlayButton()
    this.registerPauseButton()
    this.registerProgressElement()
    this.registerFullScreenButton()
    this.registerDialogElement()
    this.registerTimerButton()
  }

  play() {
    this.video.addEventListener('timeupdate', () => {
      this.currentTime = this.video.currentTime
      const part = parseInt((this.currentTime / this.duration) * 100)
      this.progress.value = part
    })

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
      this.activateFullScreen()
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
    const linkElem = document.createElement('link')
    linkElem.setAttribute('rel', 'stylesheet')
    linkElem.setAttribute('href', 'player.css')
    linkElem.setAttribute('type', 'text/css')

    this.shadow.appendChild(linkElem)
  }

  isFullscreenElementAvailable() {
    return !document.fullscreenElement &&
      !document.msFullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
  }

  activateFullScreen() {
    if (this.isFullscreenElementAvailable()) {
      this.goFullScreen()
    } else {
      this.exitFullscreen()
    }
  }

  goFullScreen() {
    if (this.wrapper.requestFullscreen) this.wrapper.requestFullscreen()
    else if (this.video.msRequestFullscreen) this.wrapper.msRequestFullscreen()
    else if (this.video.mozRequestFullScreen) this.wrapper.mozRequestFullScreen()
    else if (this.video.webkitRequestFullscreen) this.wrapper.webkitRequestFullscreen()

    this.fullScreenButton.innerText = 'Exit FullScreen'
  }

  exitFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen()
    else if (document.msExitFullscreen) document.msExitFullscreen()
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen()
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen()

    this.fullScreenButton.innerText = 'FullScreen'
  }

  render() {
    const wrapper = document.createElement('div')
    wrapper.className = 'wrapper'
    wrapper.appendChild(this.video)
    wrapper.appendChild(this.progress)
    wrapper.appendChild(this.playButton)
    wrapper.appendChild(this.pauseButton)
    wrapper.appendChild(this.fullScreenButton)
    wrapper.appendChild(this.timerButton)
    wrapper.appendChild(this.dialog)
    this.wrapper = wrapper
    this.addStyles()
    this.shadow.append(this.wrapper)
  }

  setTimer() {
    this.timer = setInterval(() => {
      this.closeDialog()
      this.showDialog()
    }, 5000)
  }

  registerDialogElement() {
    const dialog = document.createElement('div')

    dialog.style.position = 'absolute'
    dialog.style.backgroundColor = 'CornflowerBlue'
    dialog.style.width = '250px'
    dialog.style.height = '50px'
    dialog.style.top = 'calc(50% - 25px)'
    dialog.style.left = 'calc(50% - 125px)'
    dialog.style.display = 'none'
    dialog.innerText = 'ЗАКРОЙ МЕНЯ'

    const closeButton = document.createElement('button')
    closeButton.innerText = 'закрыть'
    closeButton.addEventListener('click', () => {
      this.closeDialog()
    })
    dialog.appendChild(closeButton)

    this.dialog = dialog
  }

  registerTimerButton() {
    this.timerButton = document.createElement('button')

    this.timerButton.innerText = 'Go timer'

    this.timerButton.className = 'button button__fullscreen'

    this.timerButton.addEventListener('click', () => {
      this.setTimer()
    })
  }

  showDialog() {
    this.dialog.style.display = 'block'
  }

  closeDialog() {
    this.dialog.style.display = 'none'
  }
}

customElements.define('custom-player', CustomPlayer)
