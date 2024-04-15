export const accessKeyIdInput = document.getElementById('access-key-id')! as HTMLInputElement
export const secretAccessKeyInput = document.getElementById('secret-access-key')! as HTMLInputElement
export const bucketNameInput = document.getElementById('bucket-name')! as HTMLInputElement

const accessKeyId = localStorage.getItem('accessKeyId')
if (accessKeyId != null) accessKeyIdInput.value = accessKeyId

const secretAccessKey = localStorage.getItem('secretAccessKey')
if (secretAccessKey != null) secretAccessKeyInput.value = secretAccessKey

const bucketName = localStorage.getItem('bucketName')
if (bucketName != null) bucketNameInput.value = bucketName

accessKeyIdInput.addEventListener('input', () => {
  localStorage.setItem('accessKeyId', accessKeyIdInput.value)
})

secretAccessKeyInput.addEventListener('input', () => {
  localStorage.setItem('secretAccessKey', secretAccessKeyInput.value)
})

bucketNameInput.addEventListener('input', () => {
  localStorage.setItem('bucketName', bucketNameInput.value)
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
