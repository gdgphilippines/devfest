export default {
  '/': () => { return System.import('./modules/devfest-module/pages/devfest-landing-page.html') },
  '/index.html': () => { return System.import('./modules/devfest-module/pages/devfest-landing-page.html') },
  '/call-for-speakers': () => { return System.import('./modules/devfest-module/pages/devfest-call-for-speakers-page.html') }
}
