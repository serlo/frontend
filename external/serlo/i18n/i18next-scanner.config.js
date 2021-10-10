const createTypescriptTransform = require('i18next-scanner-typescript')

module.exports = {
  options: {
    func: {
      list: ['i18n.t', 'i18next.t'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    lngs: ['en'],
    ns: ['default'],
    nsSeparator: ':::',
    keySeparator: '::',
    defaultNs: 'default',
    defaultLng: 'en',
    removeUnusedKeys: true,
    resource: {
      loadPath: 'resources/{{ns}}.json',
      savePath: 'resources/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    defaultValue(lng, ns, key) {
      return key
    },
  },
  input: [
    '../../private/edtr-io/src/**/*.{js,jsx,ts,tsx}',
    '../../public/client/src/{editor,frontend,legacy-editor,libs,main,modules}/**/*.{js,jsx,ts,tsx}',
    '../../public/frontend/{src,pages}/**/*.{js,jsx,ts,tsx}',
  ],
  output: './',
  transform: createTypescriptTransform(),
}
