import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';

import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'core-components',
  taskQueue: 'async',
  plugins: [
    inlineSvg(),
    sass({
      injectGlobalPaths: ['src/global/preflight/main.scss'],
    }),
    postcss({
      plugins: [require('tailwindcss')('./tailwind.config.js'), autoprefixer(), ...(process.env.NODE_ENV === 'production' ? [purgecss, require('cssnano')] : [])],
    }),
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },

    reactOutputTarget({
      componentCorePackage: '@rds-core/core-components',
      proxiesFile:
        '......packagescore-components-react/src/generated/components.ts',
      includeDefineCustomElements: true,
    }),
  ],
};
