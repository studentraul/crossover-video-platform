export const truncateString = (string, size) => {
  if (size >= string.length) return string
  else if (size <= 3) {
    return string.slice(0, size) + '...'
  } else {
    return string.slice(0, size).slice(0, -3) + '...'
  }
}
