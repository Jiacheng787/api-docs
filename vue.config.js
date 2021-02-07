const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '.', dir);
}
module.exports = {
    // 部署应用包时的基本 URL
    publicPath: '/',
    // 生成的生产环境构建文件的目录
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: 'assets',
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',
    // 文件名中包含hash 
    filenameHashing: true,
    // 在 multi-page 模式下构建应用, 单页面一般不需要考虑（详情查看文档配置）
    pages: undefined,
    // 保存时自动触发eslint
    lintOnSave: process.env.NODE_ENV !== 'production',
    // 是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,
    // babel 显示转译一个依赖
    // transpileDependencies: ['socket.io-client'],
    // 生产环境source map 关闭可提升打包速度
    productionSourceMap: false,
    // crossorigin: undefined,
    // integrity: false,
    css: {
        // modules: false,
        requireModuleExtension: true,
        extract: process.env.NODE_ENV === 'production',
        sourceMap: false,
        loaderOptions: {}
    },
    // 并行打包
    parallel: true, // 默认值require('os').cpus().length > 1,
    pluginOptions: {},
    // 本地开发服务器配置
    devServer: {
        // 自动打开浏览器
        open: true,
        // 设置为0.0.0.0则所有的地址均能访问
        host: '0.0.0.0',
        port: 8066,
        https: false,
        hotOnly: false,
        // 使用代理
        proxy: {
            '/api': {
                // 目标代理服务器地址
                target: 'http://127.0.0.1:7001',
                // 允许跨域
                changeOrigin: true,
            },
        },
    },
    // 针对webpack的配置，如果遇到上述配置，能使用的尽量不要改动webpack的配置
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    },
    // chain模式下的webpalk plugin配置
    // chainWebpack: config => {
    //     // const svgRule = config.module.rule('svg');
    //     // 清除已有的所有 loader。
    //     // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    //     // svgRule.uses.clear()

    //     // 添加要替换的 loader
    //     // svgRule
    //     //     .use('vue-svg-loader')
    //     //     .loader('vue-svg-loader');

    //     // 替换svg-sprite-loader
    //     // svgRule
    //     // .use("svg-sprite-loader")
    //     // .loader("svg-sprite-loader")
    //     // .options({
    //     //     symbolId: "icon-[name]"
    //     // });

    //     // 解决Vue-cli3使用svg-sprite-loader的vue.config配置（node_modules里有个svg导致一直报错）只应用于src/icons目录下
    //     config.module
    //         .rule('svg')
    //         .exclude.add(resolve('src/icons'))
    //         .end();

    //     config.module
    //         .rule('icons')
    //         .test(/\.svg$/)
    //         .include.add(resolve('src/icons'))
    //         .end()
    //         .use('svg-sprite-loader')
    //         .loader('svg-sprite-loader')
    //         .options({
    //             symbolId: 'icon-[name]'
    //         });
    //     // config.entry('app').clear().add('babel-polyfill').add('./src/main.js').end()
    //     config
    //         .plugin('env')
    //         .use(require.resolve('webpack/lib/ProvidePlugin'), [{
    //             jQuery: 'jquery',
    //             $: 'jquery',
    //             "windows.jQuery": "jquery"
    //         }])

    // }
}