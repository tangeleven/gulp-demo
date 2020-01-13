var env = process.env.NODE_ENV;

var devConfig = {
    api: 'https://glkj-dev.taxchina.com/api/web/'
}

var testConfig = {
    api: 'https://glkj-test.taxchina.com/api/web/'
}

var prodConfig = {
    api: 'https://glkj.taxchina.com/api/web/'
}

var config = {};

if (env == 'development') {
    config = devConfig
} else if (env == 'test') {
    config = testConfig
} else if (env == 'production') {
    config = prodConfig
}

exports.config = config;


