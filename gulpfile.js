var { src, dest, series } = require('gulp');
var uglify = require('gulp-uglify');
var del = require('del');

function cleanAll (cb) {

    console.log(1111);
    del([
        // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
        'dist/'
    ]).then(paths => {
        console.log('删除成功')
        cb()
    })

}

function copy(cb) {
    console.log(2222);
    src('src/pages/**/*.html')
        .pipe(dest('dist/pages/'))

    cb()

}

function copyJS (cb) {
    console.log(3333);
    src('src/js/**/*.js')
        .pipe(dest('dist/js/'))

    cb()

}

exports.default = series( cleanAll, copyJS, copy)


