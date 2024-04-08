// @ts-check
const { FS_LAYERS, getLowerLayers, getUpperLayers } = require('./utils.cjs')

const getNotSharedLayersRules = () => {
  const base = getUpperLayers('shared').map((layer) => ({
    from: layer,
    allow: getLowerLayers(layer),
  }))

  const entitiesCrossImports = {
    from: 'entities',
    allow: [
      'shared',
      [
        '$entities/@x',
        {
          relatedSlices: '${from.slices}',
        },
      ],
    ],
  }

  const widgetsCrossImports = {
    from: 'widgets',
    allow: 'widgets',
  }

  return [entitiesCrossImports, widgetsCrossImports, ...base]
}
const sharedLayerRule = {
  from: 'shared',
  allow: 'shared',
}

const getLayersBoundariesElements = () => {
  const base = FS_LAYERS.map((layer) => ({
    type: layer,
    pattern: `${layer}/!(_*){,/*}`,
    mode: 'folder',
    capture: ['slices'],
  }))

  const entitiesCrossImports = {
    type: 'entities/@x',
    pattern: '$entities/*/@x/*.ts',
    mode: 'file',
    capture: ['slices', 'relatedSlices'],
  }

  return [entitiesCrossImports, ...base]
}

const getGodModeRules = () =>
  FS_LAYERS.map((layer) => ({
    from: `gm_${layer}`,
    allow: [layer, ...getLowerLayers(layer)],
  }))

const getGodModeElements = () =>
  FS_LAYERS.map((layer) => ({
    type: `gm_${layer}`,
    pattern: `${layer}/_*`,
    mode: 'folder',
    capture: ['slices'],
  }))

module.exports = {
  plugins: ['boundaries'],
  extends: ['plugin:boundaries/recommended'],
  ignorePatterns: ['.eslintrc.cjs'],
  settings: {
    'boundaries/elements': [
      ...getLayersBoundariesElements(),
      ...getGodModeElements(),
    ],
  },
  rules: {
    'boundaries/element-types': [
      2,
      {
        default: 'disallow',
        message:
          '"${file.type}" is not allowed to import "${dependency.type}" | See rules: https://feature-sliced.design/docs/reference/layers/overview',
        rules: [
          ...getNotSharedLayersRules(),
          sharedLayerRule,
          ...getGodModeRules(),
        ],
      },
    ],
  },
}
