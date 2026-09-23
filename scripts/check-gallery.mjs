import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
})
const page = await browser.newPage()
await page.setViewport({ width: 1400, height: 1000 })
await page.goto('http://localhost:7101/#projeler', { waitUntil: 'networkidle0', timeout: 60000 })
await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = 'auto'
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
  document.getElementById('projeler')?.scrollIntoView()
})
await new Promise((r) => setTimeout(r, 1500))
await page.screenshot({ path: '/tmp/galeri-gercek.png' })

// Lightbox testi: ilk fotoğrafa tıkla
await page.evaluate(() => {
  document.querySelectorAll('#projeler button[aria-label^="Fotoğraf"]')[0]?.click()
})
await new Promise((r) => setTimeout(r, 800))
await page.screenshot({ path: '/tmp/lightbox.png' })

const info = await page.evaluate(() => {
  const imgs = document.querySelectorAll('#projeler img')
  const video = document.querySelector('#projeler video')
  return { fotoSayisi: imgs.length, videoVar: !!video, videoSrc: video?.src ?? null }
})
console.log(JSON.stringify(info))
await browser.close()
