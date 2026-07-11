import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  optimizeDeps: {
    exclude: ['@tanstack/react-start-server', '@tanstack/start-server-core'],
  },
  plugins: [devtools(), tailwindcss(), tanstackStart(), nitro({ noExternals: true }), viteReact()],
})

export default config
