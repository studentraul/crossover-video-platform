export const truncateString = (string = '', size = 0) => {
  if (size >= string.length) return string
  else if (size <= 3) {
    return string.slice(0, size) + '...'
  } else {
    return string.slice(0, size).slice(0, -3) + '...'
  }
}

export const cleanVideoName = (videoName = '') => videoName.replace(/\[\d*\]\s/,'')
