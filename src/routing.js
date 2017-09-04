
    export default {
      '/': () => { return import(/* webpackChunkName: "devfest-landing-page" */ './modules/devfest-module/pages/devfest-landing-page.html') }, 
'/index.html': () => { return import(/* webpackChunkName: "devfest-landing-page" */ './modules/devfest-module/pages/devfest-landing-page.html') }, 
'/speakers': () => { return import(/* webpackChunkName: "devfest-speakers-page" */ './modules/devfest-module/pages/devfest-speakers-page.html') }, 
'/tickets': () => { return import(/* webpackChunkName: "devfest-tickets-page" */ './modules/devfest-module/pages/devfest-tickets-page.html') }, 
'/auth-check': () => { return import(/* webpackChunkName: "devfest-authorized-page" */ './modules/devfest-module/pages/devfest-authorized-page.html') }
    }
  