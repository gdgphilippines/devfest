
    export default {
      '/': () => { return import(/* webpackChunkName: "devfest-landing-page" */ './modules/devfest-module/pages/devfest-landing-page/devfest-landing-page.js') }, 
'/index.html': () => { return import(/* webpackChunkName: "devfest-landing-page" */ './modules/devfest-module/pages/devfest-landing-page/devfest-landing-page.js') }, 
'/speakers': () => { return import(/* webpackChunkName: "devfest-speakers-page" */ './modules/devfest-module/pages/devfest-speakers-page/devfest-speakers-page.js') }, 
'/speakers/:id': () => { return import(/* webpackChunkName: "devfest-speaker-page" */ './modules/devfest-module/pages/devfest-speaker-page/devfest-speaker-page.js') }, 
'/tickets': () => { return import(/* webpackChunkName: "devfest-tickets-page" */ './modules/devfest-module/pages/devfest-tickets-page/devfest-tickets-page.js') }, 
'/auth-check': () => { return import(/* webpackChunkName: "devfest-authorized-page" */ './modules/devfest-module/pages/devfest-authorized-page/devfest-authorized-page.js') }
    }
  