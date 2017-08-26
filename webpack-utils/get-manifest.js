const getConfig = require('./get-config')

module.exports = (env) => {
  const {config, theme} = getConfig(env)
  return JSON.stringify({
    name: config.app.title,
    short_name: config.app.shortTitle,
    start_url: theme.startUrl,
    display: theme.display,
    theme_color: theme.themeColor,
    background_color: theme.backgroundColor,
    icons: theme.icons
  })
}