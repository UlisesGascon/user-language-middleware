const debug = require('debug')('user-language-middleware')

const normalizeToIsoLangCode = lang => lang.slice(0, 2).toLowerCase()

module.exports = ({ defautlLang, availableLangs }) => {
  debug(`Current Settings: defautlLang (${defautlLang}) and availableLangs (${availableLangs})`)

  return (req, res, next) => {
    const acceptLanguage = req.headers['accept-language']
    debug(`Current accept-language header value is (${acceptLanguage})`)
    req.userLang = defautlLang

    if (acceptLanguage) {
      const multipleLanguages = acceptLanguage.split(',')
      const validLangs = multipleLanguages.filter(lang => availableLangs.includes(normalizeToIsoLangCode(lang)))[0]
      req.userLang = validLangs ? normalizeToIsoLangCode(validLangs) : defautlLang
    }

    debug(`Current user lang is (${req.userLang})`)

    next()
  }
}
