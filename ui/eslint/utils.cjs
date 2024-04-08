const FS_LAYERS = [
  'app',
  'processes',
  'pages',
  'widgets',
  'features',
  'entities',
  'shared',
]

const FS_SEGMENTS = ['ui', 'model', 'lib', 'api', 'config', 'assets']

/**
 * @param {string} layer
 * @returns {string[]}
 */
const getLowerLayers = (layer) => FS_LAYERS.slice(FS_LAYERS.indexOf(layer) + 1)

/**
 * @param {string} layer
 * @returns {string[]}
 */
const getUpperLayers = (layer) => FS_LAYERS.slice(0, FS_LAYERS.indexOf(layer))

module.exports = {
  FS_LAYERS,
  FS_SEGMENTS,
  getLowerLayers,
  getUpperLayers,
}
