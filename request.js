import request from 'request'
import jsdom from 'jsdom'
import html from 'htmlparser2'
const { JSDOM } = jsdom

// request('http://www.nogizaka46.com/',async (error, res, body) => {
//   const dom = await new JSDOM(body)
//   const result = await dom.window.document.querySelectorAll('a')
//   result.forEach(value => console.log(value.host))
// })

// request('http://www.nogizaka46.com/',async (error, res, body) => {
//   const dom = await new JSDOM(body)
//   const result = await dom.window.document.querySelectorAll('a')
//   result.forEach(value => console.log(value.rel))
// })

request('http://www.nogizaka46.com/',async (error, res, body) => {
  const dom = await html.parseDOM(body)
  console.log(dom.querySelectorAll('a'))
})
