
var { src, dest, series, watch } = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var fileinclude = require('gulp-file-include');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload'); // 网页自动刷新（文件变动后即时刷新页面）
var webserver = require('gulp-webserver'); // 本地服务器


function cleanAll (done) {
    console.log(1111);
    del(['dist/']).then(paths => {
        console.log('删除成功')
        done()
    })
}

function htmlCopy(done) {
    src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('dist/'))

    src('src/pages/**/*.html', {ignore: 'src/pages/includes/head.html'})
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('dist/pages/'))
        
        done();
}

function jsConcat(done) {
    src(['src/js/base/*.js', 'src/js/utils/*.js', 'src/js/config.js'])
        .pipe(uglify())
        .pipe(concat('base.js'))
        .pipe(dest('dist/js/'))
    
    src('src/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest('dist/')) 
        
    src('src/pages/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest('dist/pages/'))    

        done()
}

function cssConcat(done) {
    src(['src/css/base/*.css'])
        .pipe(concat('base.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest('dist/css/'))
    
    src('src/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(dest('dist/'))
        
    src('src/pages/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(dest('dist/pages/'))    

        done()
}


// var watcher = watch('src/pages/**/*.js');

// watcher.on('change', function(path, stats) {
//     console.log(`File ${path} was changed`);
// })

function watcher(done) {
    console.log('开始打包')
    
    console.log('开始监听')
    watch(['src/js/base/*.js', 'src/js/utils/*.js', 'src/js/config.js', 'src/*.js', 'src/pages/**/*.js'], series(jsConcat))
    watch(['src/css/base/*.css', 'src/*.css', 'src/pages/**/*.css'], series(cssConcat))
    watch(['src/pages/**/*.html', 'src/*.html'], series(htmlCopy))
    setTimeout(function() {
        console.log('监听完成')
        done()
    },1000)
    
}

function createWebserver(done) {
    src( 'dist' )
        .pipe(webserver({
            livereload: true, // 启用LiveReload
            open: true, // 服务器启动时自动打开网页
            open: '/pages/index/index.html'
        }))

        done()
}

exports.default = series(series(htmlCopy, jsConcat, cssConcat), watcher, createWebserver);

exports.prod = series(cleanAll, htmlCopy, jsConcat, cssConcat)

exports.test = series(cleanAll, htmlCopy, jsConcat, cssConcat)




