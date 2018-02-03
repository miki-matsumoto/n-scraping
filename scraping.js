import puppeteer from 'puppeteer'

const scrape = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto('http://www.nogizaka46.com/news/')

  const result = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('div')
    const data = []
    nodeList.forEach(node => {data.push(node.innerText)})

    return data
  })

  browser.close()
  return result
}

scrape().then((value) => {
  console.log(value)
})
