import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig } from 'vite'
import { pluginExposeRenderer } from './vite.base.config'

import path from 'path'

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<'renderer'>
  const { root, mode, forgeConfigSelf } = forgeEnv
  const name = forgeConfigSelf.name ?? ''

  return {
    root,
    mode,
    base: './',
    build: {
      outDir: `.vite/renderer/${name}`,
      rollupOptions: {
        output: {
          manualChunks(id: string): string | undefined {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .replace(/^\/?[^/]+\//, '/')
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          }
        }
      }
    },
    plugins: [pluginExposeRenderer(name)],
    resolve: {
      preserveSymlinks: true,
      alias: [
        { find: '@view', replacement: path.resolve(__dirname, './src/view/src') },
        { find: '@view/assets', replacement: path.resolve(__dirname, './src/view/src/assets') },
        {
          find: '@view/components',
          replacement: path.resolve(__dirname, './src/view/src/components')
        },
        { find: '@view/hook', replacement: path.resolve(__dirname, './src/view/src/hook') },
        { find: '@view/store', replacement: path.resolve(__dirname, './src/view/src/store') },
        { find: '@view/utils', replacement: path.resolve(__dirname, './src/view/src/utils') },
        { find: '@view/ui', replacement: path.resolve(__dirname, './src/view/src/ui') },
        { find: '@common', replacement: path.resolve(__dirname, './src/common') }
      ]
    },
    clearScreen: false
  } as UserConfig
})
