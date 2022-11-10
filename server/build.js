import esbuild from 'esbuild';
import glob from 'glob';

esbuild.build({
  entryPoints: glob.sync('src/**/*.ts'),
  outdir: 'build',
  resolveExtensions: ['.js'],
}).catch(() => process.exit(1))
