
    export default {
      '/': () => { return import(/* webpackChunkName: "devfest-landing-page" */ './modules/devfest-module/pages/devfest-landing-page/devfest-landing-page.js') }, 
'/index.html': () => { return import(/* webpackChunkName: "devfest-landing-page" */ './modules/devfest-module/pages/devfest-landing-page/devfest-landing-page.js') }, 
'/speakers': () => { return import(/* webpackChunkName: "devfest-speakers-page" */ './modules/devfest-module/pages/devfest-speakers-page/devfest-speakers-page.js') }, 
'/speakers/:id': () => { return import(/* webpackChunkName: "devfest-speaker-page" */ './modules/devfest-module/pages/devfest-speaker-page/devfest-speaker-page.js') }, 
'/sessions': () => { return import(/* webpackChunkName: "devfest-sessions-page" */ './modules/devfest-module/pages/devfest-sessions-page/devfest-sessions-page.js') }, 
'/sessions/:id': () => { return import(/* webpackChunkName: "devfest-session-page" */ './modules/devfest-module/pages/devfest-session-page/devfest-session-page.js') }, 
'/tickets': () => { return import(/* webpackChunkName: "devfest-tickets-page" */ './modules/devfest-module/pages/devfest-tickets-page/devfest-tickets-page.js') }, 
'/sponsors': () => { return import(/* webpackChunkName: "devfest-sponsors-page" */ './modules/devfest-module/pages/devfest-sponsors-page/devfest-sponsors-page.js') }, 
'/auth-check': () => { return import(/* webpackChunkName: "devfest-authorized-page" */ './modules/devfest-module/pages/devfest-authorized-page/devfest-authorized-page.js') }
    }
  