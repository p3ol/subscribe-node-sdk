import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const input = './lib/index.js';
const output = './dist';

const defaultPlugins = [
  resolve({ preferBuiltins: true }),
  commonjs(),
];

const defaultExternals = ['node-fetch', 'query-string'];

export default [
  // cjs
  {
    input,
    plugins: defaultPlugins,
    context: 'this',
    external: defaultExternals,
    output: {
      file: `${output}/index.cjs.js`,
      format: 'cjs',
      sourcemap: true,
      inlineDynamicImports: true,
      exports: 'default',
    },
  }, {
    input,
    plugins: defaultPlugins,
    context: 'this',
    external: defaultExternals,
    output: {
      dir: `${output}/esm`,
      chunkFileNames: '[name].js',
      format: 'esm',
      sourcemap: true,
    },
  },
];
