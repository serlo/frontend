const fetch = require('isomorphic-unfetch')
let count = 0
const url = 'https://frontend-git-page-performance.dal123.now.sh/1565'

function runSingleFetch() {
  const curId = count++
  console.time('Start fetch ' + curId)
  fetch(url)
    .then(res => res.text())
    .then(data => {
      //console.log(data.substring(1, 1000))
      console.timeEnd('Start fetch ' + curId)
    })
}

// run times

let number = 500
let currentSecond = undefined

function run() {
  if (number-- > 0) {
    const s = new Date().getSeconds()
    if (s !== currentSecond) {
      console.log(s)
      currentSecond = s
    }
    runSingleFetch()
    setTimeout(run)
  }
}
console.time('spike: ')
run()

console.timeEnd('spike: ')
