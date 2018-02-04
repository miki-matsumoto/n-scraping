// import puppeteer from 'puppeteer'
const puppeteer = require('puppeteer')
require('events').EventEmitter.defaultMaxListeners = 0

// const BASE_URL = 'https://wovn.io'
// const BASE_URL = 'http://nogizaka46.com'
const BASE_URL = 'http://minimaltech.co/'

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
  // const HOST = 'www.nogizaka46.com'
  const HOST = 'minimaltech.co'

  var urls = await firstPageUrls()
  for (let i = 0; i < urls.length; i++) {
    try {
      await page.goto(urls[i])

      const nodeLists = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a')).map(node => {
          return { host: node.host, href: node.href}
        })
      })
      nodeLists.forEach(node => {
        if (node.host === HOST && !urls.includes(node.href)) {
          urls.push(node.href)
        }
      })
    } catch (err) {
      reject(err)
    }
  }

  await browser.close()
  return urls
}


allPagesUrls().then((value) => {
  console.log(value)
})
