
import { createIntl, createIntlCache } from 'react-intl';
import ptBR from './pt-br'
import enUS from './en-us'

const lang = {
  'pt-BR': ptBR,
  'en-US': enUS
}

const cache = createIntlCache()

const getParams = (params) => {
  const url = new URL(window.location.href);
  return url.searchParams.get(params);
}

const getLanguage = () => {
  let language = lang[navigator.language]
  const urlParams = getParams('lang')
  if(urlParams) {
    language = lang[urlParams]
  }
  return language
}

export const getIntlConfig = () => {
  return {
    messages: getLanguage(),
    locale: getParams('lang') || navigator.language,
    defaultLocale: 'pt-BR'
  }
}

const intl = createIntl(getIntlConfig(), cache)

export const formatMessage = (id, fields) => intl.formatMessage({ id: id}, { ...fields })

