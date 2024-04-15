let savedData: string | null = null

setInterval(() => {
  const script = document.querySelector('script')
  const scriptUrl = script?.getAttribute('src')!
  fetch(scriptUrl)
    .then((response) => response.text())
    .then((newData) => {
      const prevData = savedData
      savedData = newData
      if (prevData === newData) {
        console.log('Script not changed!')
        return
      }
      if (prevData != null) window.location.reload()
    })
    .catch((error) => console.error('Error:', error))
}, 1000)

/* eslint-disable @typescript-eslint/no-non-null-assertion */

let photoTakenAt: Date | null = null

const button = document.getElementById('button')! as HTMLButtonElement
const video = document.getElementById('video')! as HTMLVideoElement

let mediaRecorder: MediaRecorder | null = null

const startCamera = (): void => {
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 400,
      height: 300,
      facingMode: 'environment'
    }
  })
    .then((mediaStream) => {
      video.srcObject = mediaStream

      mediaRecorder = new MediaRecorder(mediaStream)

      mediaRecorder.addEventListener('dataavailable', (event) => {
        if (event.data.size === 0) return

        const prevPhotoTakenAt = photoTakenAt
        const now = new Date()
        if (prevPhotoTakenAt != null && now.getTime() - prevPhotoTakenAt.getTime() < 3000) return

        photoTakenAt = now

        console.log('Take a photo!')

        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const context = canvas.getContext('2d')!
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const photo = document.createElement('img')
        photo.src = canvas.toDataURL('image/png')
        document.body.appendChild(photo)
      })

      mediaRecorder.start(1000)

      mediaRecorder.addEventListener('stop', () => {
        mediaRecorder = null
      })
    })
    .catch((err) => {
      console.error(err.toString())
    })
}

const endCamera = (): void => {
  video.pause()
  video.srcObject = null
  mediaRecorder?.stop()
}

button.addEventListener('click', () => {
  if (mediaRecorder != null) {
    button.value = 'Start'
    endCamera()
  } else {
    button.value = 'Stop'
    startCamera()
  }
})

/* eslint-enable @typescript-eslint/no-non-null-assertion */
