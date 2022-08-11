import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';
import autoprefixer from 'autoprefixer';
import { reactOutputTarget } from '@stencil/react-output-target';

const angularValueAccessorBindings: ValueAccessorConfig[] = [];

import {
  angularOutputTarget,
  ValueAccessorConfig,
} from '@stencil/angular-output-target';

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.tsx', './src/**/*.scss'],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

export const config: Config = {
  namespace: 'core-components',
  taskQueue: 'async',
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
        '../../../packages/core-components-react/src/generated/components.ts',
      includeDefineCustomElements: true,
    }),

    angularOutputTarget({
      componentCorePackage: '@rds-core/core-components',
      directivesProxyFile:
        '../../../packages/core-components-angular/src/generated/directives/proxies.ts',
      directivesArrayFile:
        '../../../packages/core-components-angular/src/generated/directives/index.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
  ],
  plugins: [
    inlineSvg(),
    sass({
      injectGlobalPaths: ['src/global/preflight/main.scss'],
    }),
    postcss({
      plugins: [
        require('tailwindcss')('./tailwind.config.js'),
        autoprefixer(),
        ...(process.env.NODE_ENV === 'production'
          ? [purgecss, require('cssnano')]
          : []),
      ],
    }),
  ],
};
