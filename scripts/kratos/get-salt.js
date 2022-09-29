const saltPattern = [1, 3, 5, 9, 14, 15, 20, 21, 28, 30]

function findSaltAndPassword(customHash) {
  // const salt = customHash.reduce()
  const [salt, password] = customHash.split('').reduce(
    ([salt, password, patternIndex], char, pos) => {
      if (saltPattern[patternIndex] + patternIndex === pos) {
        return [salt + char, password, patternIndex + 1]
      } else return [salt, password + char, patternIndex]
    },
    ['', '', 0]
  )
  console.log(`Salt: ${salt}`)
  console.log(`Pass: ${password}`)
}

findSalt('8a534960a8a4c8e348150a0ae3c7f4b857bfead4f02c8cbf0d')

// probably correct salt a40c10cfe4
