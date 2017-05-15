var FontFaceObserver = require('fontfaceobserver')

var font = new FontFaceObserver('Roboto')

font.load().then(() => {
  document.body.classList.add('roboto')
  console.log('Roboto has loaded')
}).catch(e => {
  console.log(e)
})
