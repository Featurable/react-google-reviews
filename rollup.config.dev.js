import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from '@rollup/plugin-replace';
import typescript from "@rollup/plugin-typescript";
import livereload from 'rollup-plugin-livereload';
import postcss from "rollup-plugin-postcss";
import serve from 'rollup-plugin-serve';

export default {
  input: "src/app/index.tsx",
  output: {
    file: "dist/dev/bundle.js",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      preventAssignment: true
    }),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs({
      include: /node_modules/
    }),
    typescript({
      tsconfig: "./tsconfig.build.json",
    }),
    postcss({
      extract: true,
      minimize: false,
    }),
    serve({
      contentBase: ['dist', 'public'],
      port: 3000,
      open: true
    }),
    livereload('dist'),
  ],
}