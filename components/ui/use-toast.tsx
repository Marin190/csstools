interface Toast {
  title: string
  description?: string
}

export function toast({ title, description }: Toast) {
  // Simple toast implementation
  const toastEl = document.createElement('div')
  toastEl.className = 'fixed top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-md shadow-lg z-50'
  toastEl.innerHTML = `
    <div class="font-medium">${title}</div>
    ${description ? `<div class="text-sm opacity-90">${description}</div>` : ''}
  `
  document.body.appendChild(toastEl)
  
  setTimeout(() => {
    document.body.removeChild(toastEl)
  }, 3000)
}