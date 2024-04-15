import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import './reloader'
import { button, getBucketName, getCredentials, getHeight, getWidth, takePhotoButton, video } from './element'
import { toast } from './util'

let s3: S3Client | null = null

let photoTakenAt: Date | null = null

let mediaRecorder: MediaRecorder | null = null

const startCamera = (): void => {
  s3 = new S3Client({
    region: 'ap-northeast-1',
    credentials: getCredentials()
  })
  const width = getWidth()
  const height = getHeight()
  video.width = width
  video.height = height
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: width,
      height: height,
      // PC: localStorage.setItem('facingMode', 'user')
      facingMode: localStorage.getItem('facingMode') ?? { exact: 'environment' }
    }
  })
    .then((mediaStream) => {
      video.srcObject = mediaStream

      mediaRecorder = new MediaRecorder(mediaStream)

      mediaRecorder.addEventListener('dataavailable', (event) => {
        if (event.data.size === 0) return

        const prevPhotoTakenAt = photoTakenAt
        const now = new Date()
        if (prevPhotoTakenAt != null && now.getTime() - prevPhotoTakenAt.getTime() < 10 * 60 * 1000) return

        photoTakenAt = now

        console.log('Take a photo!')

        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const context = canvas.getContext('2d')!
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        canvas.toBlob((blob) => {
          const putObjectCommand = new PutObjectCommand({
            Bucket: getBucketName(),
            Key: `${now.getTime()}.png`,
            Body: blob
          })
          s3?.send(putObjectCommand)
            .then((data) => {
              toast('Sent!', 300)
            })
            .catch((err) => {
              console.error(err.toString())
              toast('Failed to send!', 1000)
            })
        }, 'image/png')
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
    button.textContent = 'Start'
    endCamera()
  } else {
    button.textContent = 'Stop'
    startCamera()
  }
})

takePhotoButton.addEventListener('click', () => {
  if (mediaRecorder == null) return
  photoTakenAt = null
  mediaRecorder.requestData()
})
