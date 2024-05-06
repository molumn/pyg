import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vite'
import { getBuildConfig, getBuildDefine, external, pluginHotRestart } from './vite.base.config'

import path from 'path'

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<'build'>
  const { forgeConfigSelf } = forgeEnv
  const define = getBuildDefine(forgeEnv)
  const config: UserConfig = {
    build: {
      lib: {
        entry: forgeConfigSelf.entry!,
        fileName: () => '[name].js',
        formats: ['cjs']
      },
      rollupOptions: {
        external
      }
    },
    plugins: [pluginHotRestart('restart')],
    define,
    resolve: {
      // Load the Node.js entry.
      mainFields: ['module', 'jsnext:main', 'jsnext'],
      alias: [
        { find: '@app', replacement: path.resolve(__dirname, './src/app') },
        { find: '@app/structure', replacement: path.resolve(__dirname, './src/app/structure') },
        { find: '@app/process', replacement: path.resolve(__dirname, './src/app/process') },
        { find: '@lib', replacement: path.resolve(__dirname, './src/lib') },
        { find: '@common', replacement: path.resolve(__dirname, './src/common') }
      ]
    }
  }

  return mergeConfig(getBuildConfig(forgeEnv), config)
})
