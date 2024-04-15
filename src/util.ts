import { toastElement } from "./element";

export function toast(message: string, timeout: number) {
  toastElement.textContent = message
  toastElement.style.display = 'block'
  setTimeout(() => {
    toastElement.style.display = 'none'
  }, timeout)
}
