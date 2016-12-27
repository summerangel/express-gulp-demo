/**
 * Created by summer on 16/12/26.
 */
import gulp from 'gulp';
import gutil from 'gulp-util';
import watch from 'gulp-watch';
import babel from 'gulp-babel';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack.config';

gulp.task('transform', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('watch-transform', () => {
  return gulp.src('src/**/*.js')
    .pipe(watch('src/**/*.js', {
      verbose: true
    }))
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('webpack:build', (callback) => {
var myConfig = Object.create(webpackConfig);
myConfig.plugins = myConfig.plugins.concat(
  new webpack.DefinePlugin({
      'process.env': {
        'NODE_EVN': JSON.stringify('production')
      }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin()
);

webpack(myConfig, (err, stats) => {
  if(err)
    throw new gutil.PluginError('webpack:build', err);
gutil.log('[webpack:build]', stats.toString({
  colors: true
}));
callback();
});
});

gulp.task('webpack-dev-server', (callback) => {
  var myConfig = Object.create(webpackConfig);
myConfig.devtool = 'eval';
myConfig.debug = true;

new WebpackDevServer(webpack(myConfig), {
  publicPath: '/' + myConfig.output.publicPath,
  stats: {
    colors: true
  }
}).listen(3001, 'localhost', (err) => {
  if(err) throw new gutil.PluginError('webpack-dev-server', err);
gutil.log('[webpack-dev-server]', 'http://localhost:3001/');
});
});

gulp.task('default', ['watch-transform', 'webpack-dev-server']);