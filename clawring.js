// import puppeteer from 'puppeteer'
const puppeteer = require('puppeteer')
require('events').EventEmitter.defaultMaxListeners = 0

// const BASE_URL = 'https://wovn.io'
const BASE_URL = 'http://nogizaka46.com'

const firstPageUrls = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto(BASE_URL)

  const getFirstPageUrls = await page.evaluate(() => {
    const urls = []
    const firstPageNodeLists = document.querySelectorAll('a')

    firstPageNodeLists.forEach(node => {
      if (window.location.host !== node.host || urls.indexOf(node.href) > -1) return
      urls.push(node.href)
    })

    return urls
  })

  browser.close()
  return getFirstPageUrls
}

const allPagesUrls = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  var urls = await firstPageUrls()
  for (let i = 0; i < urls.length; i++) {
    await page.goto(urls[i])

    // return でnodeListsだけ返す
    const hello = await page.evaluate(() => {
      const nodeLists = Array.from(document.querySelectorAll('a'))
      // nodeLists.forEach((node) => {
      //   if (window.location.host !== node.host || urls.indexOf(node.href) > -1) return
      //   urls.push(node.href)
      //   return
      // })
      let links = nodeLists.map(node => {
        return node.href
      })
      return links
    })
    return hello
  }

  await browser.close()
  return urls
}


allPagesUrls().then((value) => {
  console.log(value)
})
