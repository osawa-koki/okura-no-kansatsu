export const button = document.getElementById('button')! as HTMLButtonElement
export const video = document.getElementById('video')! as HTMLVideoElement

export const accessKeyIdInput = document.getElementById('access-key-id')! as HTMLInputElement
export const secretAccessKeyInput = document.getElementById('secret-access-key')! as HTMLInputElement
export const bucketNameInput = document.getElementById('bucket-name')! as HTMLInputElement
export const widthInput = document.getElementById('width')! as HTMLInputElement
export const heightInput = document.getElementById('height')! as HTMLInputElement
export const intervalSelect = document.getElementById('interval')! as HTMLSelectElement

export const takePhotoButton = document.getElementById('take-photo')! as HTMLButtonElement

const accessKeyId = localStorage.getItem('accessKeyId')
if (accessKeyId != null) accessKeyIdInput.value = accessKeyId

const secretAccessKey = localStorage.getItem('secretAccessKey')
if (secretAccessKey != null) secretAccessKeyInput.value = secretAccessKey

const bucketName = localStorage.getItem('bucketName')
if (bucketName != null) bucketNameInput.value = bucketName

const width = localStorage.getItem('width')
if (width != null) widthInput.value = width

const height = localStorage.getItem('height')
if (height != null) heightInput.value = height

const interval = localStorage.getItem('interval')
if (interval != null) intervalSelect.value = interval

accessKeyIdInput.addEventListener('input', () => {
  localStorage.setItem('accessKeyId', accessKeyIdInput.value)
})

secretAccessKeyInput.addEventListener('input', () => {
  localStorage.setItem('secretAccessKey', secretAccessKeyInput.value)
})

bucketNameInput.addEventListener('input', () => {
  localStorage.setItem('bucketName', bucketNameInput.value)
})

widthInput.addEventListener('input', () => {
  localStorage.setItem('width', widthInput.value)
})

heightInput.addEventListener('input', () => {
  localStorage.setItem('height', heightInput.value)
})

intervalSelect.addEventListener('input', () => {
  localStorage.setItem('interval', intervalSelect.value)
})

export function getCredentials() {
  return {
    accessKeyId: accessKeyIdInput.value,
    secretAccessKey: secretAccessKeyInput.value
  }
}

export function getBucketName() {
  return bucketNameInput.value
}

export function getWidth() {
  return parseInt(widthInput.value)
}

export function getHeight() {
  return parseInt(heightInput.value)
}

export function getInterval() {
  return parseInt(intervalSelect.value)
}

export const toastElement = document.getElementById('toast')! as HTMLDivElement
