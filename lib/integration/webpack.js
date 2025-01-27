import {getOptions} from 'loader-utils'
import {compile} from '../compile.js'

/**
 * A Webpack (4+) loader for xdm.
 * See `webpack.cjs`, which wraps this, because Webpack loaders must currently
 * be CommonJS.
 * `file.map` is defined when a `SourceMapGenerator` is passed in options.
 *
 * @param {string} value
 * @param {function(Error): void | function(null|undefined, string|Buffer, Object?): void} callback
 */
export function loader(value, callback) {
  compile(
    {contents: value, path: this.resourcePath},
    {...getOptions(this)}
  ).then((file) => {
    // @ts-ignore conflict between UInt8Array and Buffer is expected, and a tradeoff made in vFile typings to avoid @types/node being required
    callback(null, file.contents, file.map)
    return file
  }, callback)
}
