import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // cult-ui components import from "motion/react" (the new package name).
      // We already ship framer-motion; its v11 API is compatible, so alias
      // instead of shipping two animation engines in the bundle.
      'motion/react': 'framer-motion',
    },
  },
})
