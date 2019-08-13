const gulp = require('gulp');
const { execSync } = require('child_process');
const rimraf = require('rimraf');
const through2 = require('through2');
const merge2 = require('merge2');
const ts = require('gulp-typescript');
const webpack = require('webpack');
const tsConfig = require('./config/getTSCommonConfig')();
const webpackConfig = require('./config/getWebpackConfig')(false);
const getBabelCommonConfig = require('./config/getBabelCommonConfig');
const { cssInjection } = require('./config/utils/styleUtil');
const { getProjectPath } = require('./config/utils/helper');
const replaceLib = require('./config/replaceLib');
const stripCode = require('gulp-strip-code');
const babel = require('gulp-babel');
const transformLess = require('./config/transformLess');
const shell = require('shelljs');
const packageJson = require(getProjectPath('package.json'));

const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');
const tsDefaultReporter = ts.reporter.defaultReporter();

function dist(done) {
  rimraf.sync('dist');
  process.env.RUN_ENV = 'PRODUCTION';
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.error(info.warnings);
    }

    const buildInfo = stats.toString({
      colors: true,
      children: true,
      chunks: false,
      modules: false,
      chunkModules: false,
      hash: false,
      version: false
    });

    console.log(buildInfo);
    done(0);
  })
}

function tag(done) {
  console.log('tagging');
  const { version } = packageJson;
  execSync(`git tag ${version}`);
  execSync(`git push origin ${version}:${version}`);
  execSync('git push origin master:master');
  console.log('tagged');
  done(0);
}

function babelify(js, modules) {
  const babelConfig = getBabelCommonConfig(modules);
  delete babelConfig.cacheDirectory;
  if (modules === false) {
    babelConfig.plugins.push(replaceLib);
  } else {
    babelConfig.plugins.push(require.resolve('babel-plugin-add-module-exports'));
  }
  let stream = js.pipe(babel(babelConfig)).pipe(
    through2.obj(function z(file, encoding, next) {
      this.push(file.clone());
      if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
        const content = file.contents.toString(encoding);
        if (content.indexOf("'react-native'") !== -1) {
          // actually in antd-mobile@2.0, this case will never run,
          // since we both split style/index.mative.js style/index.js
          // but let us keep this check at here
          // in case some of our developer made a file name mistake ==
          next();
          return;
        }
        file.contents = Buffer.from(cssInjection(content));
        file.path = file.path.replace(/index\.js/, 'css.js');
        this.push(file);
        next();
      } else {
        next();
      }
    })
  );
  if (modules === false) {
    stream = stream.pipe(
      stripCode({
        start_comment: '@remove-on-es-build-begin',
        end_comment: '@remove-on-es-build-end',
      })
    );
  }
  return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
}

function compile(modules) {
  rimraf.sync(modules !== false ? libDir : esDir);
  const less = gulp
    .src(['components/**/*.less'])
    .pipe(
      through2.obj(function (file, encoding, next) {
        this.push(file.clone());
        if (file.path.match(/(\/|\\)style(\/|\\)index\.less$/)) {
          transformLess(file.path)
            .then(css => {
              file.contents = Buffer.from(css);
              file.path = file.path.replace(/\.less$/, '.css');
              this.push(file);
              next();
            })
            .catch(e => {
              console.error(e);
            });
        } else {
          next();
        }
      })
    )
    .pipe(gulp.dest(modules === false ? esDir : libDir));
  const assets = gulp
    .src(['components/**/*.@(png|svg)'])
    .pipe(gulp.dest(modules === false ? esDir : libDir));
  let error = 0;
  const source = ['components/**/*.tsx', 'components/**/*.ts', 'typings/**/*.d.ts'];
  // allow jsx file in components/xxx/
  if (tsConfig.allowJs) {
    source.unshift('components/**/*.jsx');
    source.unshift('components/**/*.js');
  }

  delete tsConfig.noEmit;

  const tsResult = gulp.src(source).pipe(
    ts(tsConfig, {
      error(e) {
        tsDefaultReporter.error(e);
        error = 1;
      },
      finish: tsDefaultReporter.finish,
    })
  );

  function check() {
    if (error && !argv['ignore-error']) {
      process.exit(1);
    }
  }

  tsResult.on('finish', check);
  tsResult.on('end', check);
  const tsFilesStream = babelify(tsResult.js, modules);
  const tsd = tsResult.dts.pipe(gulp.dest(modules === false ? esDir : libDir));
  return merge2([less, tsFilesStream, tsd, assets]);
}

gulp.task('dist',
  gulp.series(done => {
    dist(done);
  })
);

gulp.task('compile-with-es', done => {
  console.log('[Parallel] Compile to es...');
  compile(false).on('finish', done);
});

gulp.task('compile-with-lib', done => {
  console.log('[Parallel] Compile to js...');
  compile().on('finish', done);
});

gulp.task('compile', gulp.parallel('compile-with-es', 'compile-with-lib'));

gulp.task('pub',
  gulp.series(['dist', 'compile'], done => {
    if (shell.exec('npm publish').code !== 0) {
      shell.echo(`npm publish ${packageJson.version} error!`);
      shell.exit(1);
    } else {
      tag(done);
    }
    done();
  })
)

gulp.task('tag', done => tag(done));
