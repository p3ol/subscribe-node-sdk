import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const input = './lib/index.js';
const output = './dist';

const defaultPlugins = [
  alias({
    entries: [
      { find: /^node:(.+)$/, replacement: '$1' },
    ],
  }),
  resolve({ preferBuiltins: true }),
  commonjs(),
];

export default [
  // cjs
  {
    input,
    plugins: defaultPlugins,
    context: 'this',
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
    output: {
      dir: `${output}/esm`,
      chunkFileNames: '[name].js',
      format: 'esm',
      sourcemap: true,
    },
  },
];
