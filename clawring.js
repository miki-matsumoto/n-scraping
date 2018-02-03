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

  const urls = await firstPageUrls()
  await urls.map(async (url) => {
    await page.evaluate(async () => {
      await page.goto(url)
      await page.waitForNavigation();
      const nodeLists = document.querySelectorAll('a')
      await page.close()

      await nodeLists.forEach(node => {
        if (window.location.host !== node.host || urls.indexOf(node.href) > -1) return
        urls.push(node.href)
        return
      })
    })
  })

  await browser.close()
  return urls
}

firstPageUrls().then((value) => {
  console.log(value)
})

// allPagesUrls().then((value) => {
//   console.log(value)
// })
