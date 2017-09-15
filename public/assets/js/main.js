
function getRandomPosition (element, parent) {
  var x = document.getElementsByClassName('background')[0].offsetHeight - element.clientHeight
  var y = document.getElementsByClassName('background')[0].offsetWidth - element.clientWidth
  var randomX = Math.floor(Math.random() * x)
  var randomY = Math.floor(Math.random() * y)
  return [randomX, randomY]
}

var randomPosition = function (image) {
  var xy = getRandomPosition(image)
  image.style.top = xy[0] + 'px'
  image.style.left = xy[1] + 'px'
}

var initBackgroundHover = function () {
  var backgroundElm = document.getElementsByClassName('background')[0]
  var linkElms = document.getElementsByClassName('link-video')
  var videoWrap = document.querySelectorAll('.background__video')[0]
  var video = videoWrap.getElementsByTagName('video')[0]


  // Mouse Over
  for (var a = 0, len = linkElms.length; a < len; a++) {
    linkElms[a].addEventListener('mouseover', function () {
      video.style.opacity = 0
      var backdrop = this.dataset['backdrop']
      var giphyID = this.dataset['gif']
      var src = 'https://media.giphy.com/media/' + giphyID + '/giphy.mp4'

      // Set backdrop
      videoWrap.style.backgroundImage = 'url("' + backdrop + '")'

      videoWrap.classList.remove('hidden')
      randomPosition(videoWrap)
      video.setAttribute('src', src)
      video.onplay = function () {
        video.style.opacity = 1
      }
    })

    // Mouse Out
    linkElms[a].addEventListener('mouseout', function () {
      videoWrap.classList.add('hidden')
      video.pause()
    })

    // Mouse Over
    linkElms[a].addEventListener('mousemove', function (e) {
      var x = e.pageX - this.offsetLeft
      var y = e.offsetY - this.offsetTop
      backgroundElm.style.transform = 'translate(' + x / 4 + 'px, ' + y / 4 + 'px)'
    })
  }
}

document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementsByClassName('background')[0]) {
    initBackgroundHover()
  }
})

