import {defineType} from 'sanity'

export const localizedText = defineType({
  name: 'localizedText',
  title: '多语言文本',
  type: 'object',
  fields: [
    {name: 'zhHans', type: 'string', title: '中文简体'},
    {name: 'zhHant', type: 'string', title: '中文繁体'},
    {name: 'en', type: 'string', title: 'English'},
  ],
})


