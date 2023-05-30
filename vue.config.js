'use strict'
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const multiple = {
    index: {
        entry: 'src/main.js',
        template: 'public/index.html',
        filename: 'index.html',
        title: 'vms',
        chunks: ['index']
    },
    login: {
        entry: 'src/main.js',
        title: '登录',
        chunks: ['login']
    }
}
const entry = {}
Object.keys(multiple).forEach((value) => {
    if (!multiple[value].template) {
        multiple[value].template = 'public/index.html'
    }
    multiple[value].filename = `${value}.html`
    if (multiple[value].chunks.length) {
        multiple[value].chunks = [...new Set(['chunk-vendors', 'chunk-common'].concat(multiple[value].chunks))]
    }
    entry[value] = multiple[value]
})
module.exports = {
    pages: entry,
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: './assets',
    filenameHashing: false,
    productionSourceMap: false,
    lintOnSave: false,
    devServer: {
        open: true,
        // https: true,
        overlay: {
            warnings: false,
            errors: false
        },
        port: 80,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',    //target host
                changeOrigin: true                  //needed for virtual hosted sites
            }
        }
    },
    chainWebpack(config) {
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/images/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/images/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        config.module.rule('fonts').use('url-loader').loader('url-loader').options({}).end();
        config.module.rule('images').use('url-loader').loader('url-loader').options({}).end();
        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
                    config
                        .optimization.splitChunks({
                        chunks: 'all',
                        cacheGroups: {
                            libs: {
                                name: 'chunk-libs',
                                test: /[\\/]node_modules[\\/]/,
                                priority: 10,
                                chunks: 'initial' // only package third parties that are initially dependent
                            },
                            elementUI: {
                                name: 'chunk-elementUI', // split elementUI into a single package
                                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                            },
                            commons: {
                                name: 'chunk-commons',
                                test: resolve('src/components'), // can customize your rules
                                minChunks: 3, //  minimum common number
                                priority: 5,
                                reuseExistingChunk: true
                            }
                        }
                    })
                    config.optimization.runtimeChunk('single'),
                        {
                            from: path.resolve(__dirname, './public/robots.txt'), //防爬虫文件
                            to: './' //到根目录下
                        }
                }
            )
    }
}
