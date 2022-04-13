const { spawn } = require('child_process');
const path = require('path');

const rollup = require('rollup');
const loadConfigFile = require('rollup/dist/loadConfigFile.js');

(async () => {
  const config = await loadConfigFile(
    path.resolve('./rollup.config.js'),
  );

  const watcher = rollup.watch({
    ...config.options[0],
    watch: {
      include: ['lib/**', 'examples/index.js'],
    },
  });

  let child;

  watcher.on('event', ({ code, result }) => {
    if (code === 'BUNDLE_START') {
      // eslint-disable-next-line no-console
      console.log('[rollup] Detected changes, rebuilding');
    }

    if (code === 'BUNDLE_END' && !child) {
      child = spawn('nodemon', [
        '--watch', './examples',
        '--watch', './dist',
        '--exec', 'node', './examples/index.js',
      ], { stdio: [0, 1, 2] });
    }

    if (result) {
      result.close();
    }
  });

  process.on('SIGINT', () => {
    child?.kill();
    watcher.close();
  });

  process.on('SIGTERM', () => {
    child?.kill();
    watcher.close();
  });
})();
