import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

export default defineConfig({
  input: ['./src/index.ts', './src/runtime.ts'],
  plugins: [
    typescript(),
  ],
});
