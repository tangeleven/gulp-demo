var { src, dest, series } = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var del = require('del');

function cleanAll (cb) {
    /* src('output/')
        .pipe(clean({ force: true })) */
    // cb()
    console.log(1111);
    del([
        // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
        'output/'
    ]).then(paths => {
        console.log('删除成功')
        cb()
    })

    // 加定时器是为了防止，删除任务还没有执行完，后面的任务就已经开是执行，导致打包报错
    /* setTimeout(function(){
        cb()
    },1000) */

}

function copy(cb) {
    console.log(2222);
    src('src/pages/**/*.html')
        .pipe(dest('output/pages/'))

    cb()

}

function copyJS (cb) {
    console.log(3333);
    src('src/js/**/*.js')
        .pipe(dest('output/js/'))

    cb()

}

exports.default = series( cleanAll, copyJS, copy)


