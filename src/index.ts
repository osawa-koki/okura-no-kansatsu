import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import './reloader'
import { getBucketName, getCredentials } from './input'
import { HEIGHT, WIDTH } from './const'

let s3: S3Client | null = null

let photoTakenAt: Date | null = null

const button = document.getElementById('button')! as HTMLButtonElement
const video = document.getElementById('video')! as HTMLVideoElement

let mediaRecorder: MediaRecorder | null = null

const startCamera = (): void => {
  s3 = new S3Client({
    region: 'ap-northeast-1',
    credentials: getCredentials()
  })
  video.width = WIDTH
  video.height = HEIGHT
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: WIDTH,
      height: HEIGHT,
      facingMode: 'user'
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

        canvas.toBlob((blob) => {
          const putObjectCommand = new PutObjectCommand({
            Bucket: getBucketName(),
            Key: `${now.getTime()}.png`,
            Body: blob
          })
          s3?.send(putObjectCommand)
            .then((data) => {
              console.log(data)
            })
            .catch((err) => {
              console.error(err)
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
    button.value = 'Start'
    endCamera()
  } else {
    button.value = 'Stop'
    startCamera()
  }
})
