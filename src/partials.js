
    export default {
      'header': () => { return import(/* webpackChunkName: "devfest-header" */ './modules/devfest-module/components/devfest-header/devfest-header.js') }, 
'drawer': () => { return import(/* webpackChunkName: "devfest-drawer" */ './modules/devfest-module/components/devfest-drawer/devfest-drawer.js') }
    }
  