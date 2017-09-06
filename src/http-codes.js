
    export default {
      'not-found': () => { return import(/* webpackChunkName: "devfest-not-found-page" */ './modules/devfest-module/pages/devfest-not-found-page.html') }, 
'not-authorized': () => { return import(/* webpackChunkName: "devfest-not-authorized-page" */ './modules/devfest-module/pages/devfest-not-authorized-page.html') }
    }
  