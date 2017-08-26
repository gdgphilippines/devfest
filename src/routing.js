
    export default {
      '/': () => { return import(/* webpackChunkName: "devfest-landing-page" */ './modules/devfest-module/pages/devfest-landing-page.html') }, 
'/index.html': () => { return import(/* webpackChunkName: "devfest-landing-page" */ './modules/devfest-module/pages/devfest-landing-page.html') }, 
'/call-for-speakers': () => { return import(/* webpackChunkName: "devfest-call-for-speakers-page" */ './modules/devfest-module/pages/devfest-call-for-speakers-page.html') }
    }
  