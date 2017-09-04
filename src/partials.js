
    export default {
      'header': () => { return import(/* webpackChunkName: "devfest-header" */ './modules/devfest-module/components/devfest-header.html') }, 
'drawer': () => { return import(/* webpackChunkName: "devfest-drawer" */ './modules/devfest-module/components/devfest-drawer.html') }
    }
  