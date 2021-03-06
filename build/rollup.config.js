import path from 'path'
import del from 'rollup-plugin-delete'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import copy from 'postcss-copy'
import fixes from 'postcss-flexbugs-fixes'
import preset from 'postcss-preset-env'
import url from 'rollup-plugin-url'
import { uglify } from 'rollup-plugin-uglify'
import tsc from 'rollup-plugin-typescript'

const dist = path.resolve(__dirname, '../dist')

export default {
  input: path.resolve(__dirname, '../src/index.tsx'),
  context: 'window',
  output: {
    dir: dist,
    format: 'umd',
    name: 'RCLeafletHeat',
    exports: 'named',
    globals: {
      'prop-types': 'PropTypes',
      'leaflet-heatmap': 'HeatmapOverlay',
      'rc-leaflet': 'RCLeaflet'
    }
  },
  external: ['prop-types', 'leaflet-heatmap', 'rc-leaflet'],
  plugins: [
    del({ targets: path.resolve(__dirname, '../dist/*') }),
    resolve(),
    tsc({
      exclude: ['node_modules/**'],
      typescript: require('typescript'),
      tslib: require('tslib')
    }),
    postcss({
      extract: true,
      minimize: true,
      plugins: [
        copy({
          dest: dist,
          template: 'assets/[name]-[hash].[ext]'
        }),
        fixes(),
        preset({
          autoprefixer: {
            flexbox: 'no-2009'
          },
          stage: 3
        })
      ]
    }),
    url({
      limit: undefined
    }),
    uglify()
  ]
}
