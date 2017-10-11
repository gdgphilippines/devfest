
    export default {
      '/': () => { return import(/* webpackChunkName: "devfest-landing-page" */ './modules/devfest-module/pages/devfest-landing-page/devfest-landing-page.js') }, 
'/index.html': () => { return import(/* webpackChunkName: "devfest-landing-page" */ './modules/devfest-module/pages/devfest-landing-page/devfest-landing-page.js') }, 
'/speakers': () => { return import(/* webpackChunkName: "devfest-speakers-page" */ './modules/devfest-module/pages/devfest-speakers-page/devfest-speakers-page.js') }, 
'/speakers/:id': () => { return import(/* webpackChunkName: "devfest-speaker-page" */ './modules/devfest-module/pages/devfest-speaker-page/devfest-speaker-page.js') }, 
'/sessions': () => { return import(/* webpackChunkName: "devfest-sessions-page" */ './modules/devfest-module/pages/devfest-sessions-page/devfest-sessions-page.js') }, 
'/sessions/:id': () => { return import(/* webpackChunkName: "devfest-session-page" */ './modules/devfest-module/pages/devfest-session-page/devfest-session-page.js') }, 
'/tickets': () => { return import(/* webpackChunkName: "devfest-tickets-page" */ './modules/devfest-module/pages/devfest-tickets-page/devfest-tickets-page.js') }, 
'/sponsors': () => { return import(/* webpackChunkName: "devfest-sponsors-page" */ './modules/devfest-module/pages/devfest-sponsors-page/devfest-sponsors-page.js') }, 
'/tnc': () => { return import(/* webpackChunkName: "devfest-tnc-page" */ './modules/devfest-module/pages/devfest-tnc-page/devfest-tnc-page.js') }, 
'/login': () => { return import(/* webpackChunkName: "devfest-login-page" */ './modules/devfest-module/pages/devfest-login-page/devfest-login-page.js') }, 
'/profile': () => { return import(/* webpackChunkName: "devfest-profile-page" */ './modules/devfest-module/pages/devfest-profile-page/devfest-profile-page.js') }, 
'/codelabs/:type?/:id?/:page?': () => { return import(/* webpackChunkName: "devfest-codelabs-page" */ './modules/devfest-module/pages/devfest-codelabs-page/devfest-codelabs-page.js') }, 
'/connect-ticket': () => { return import(/* webpackChunkName: "devfest-connect-page" */ './modules/devfest-module/pages/devfest-connect-page/devfest-connect-page.js') }, 
'/scan': () => { return import(/* webpackChunkName: "devfest-scan-page" */ './modules/devfest-module/pages/devfest-scan-page/devfest-scan-page.js') }, 
'/scanned-list': () => { return import(/* webpackChunkName: "devfest-scanned-list-page" */ './modules/devfest-module/pages/devfest-scanned-list-page/devfest-scanned-list-page.js') }, 
'/are-you-a-sponsor': () => { return import(/* webpackChunkName: "devfest-not-sponsor-page" */ './modules/devfest-module/pages/devfest-not-sponsor-page/devfest-not-sponsor-page.js') }, 
'/auth-check': () => { return import(/* webpackChunkName: "devfest-authorized-page" */ './modules/devfest-module/pages/devfest-authorized-page/devfest-authorized-page.js') }
    }
  