
import {locales} from './locales'

export const _I18N = (str,lang='ua') => {
    const mesobj = (locales[str])?locales[str]:''
    return (mesobj[lang])?mesobj[lang]:''
}