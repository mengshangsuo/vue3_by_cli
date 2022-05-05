const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/css/common.scss";',
      },
      // scss: {
      //   additionalData: '@import "@/assets/scss/theme.scss";'
      // }
    },
  },
//  webpack配置
  configureWebpack: (config) => {
    // console.log('process.argv', process.argv);
    // console.log('config', config);
    // console.log('process.env.NODE_ENV', process.env.NODE_ENV);

    if (process?.env?.NODE_ENV === "production") {
      // 为生产环境修改配置...
    } else if (process?.env?.NODE_ENV === "development") {
      // 为开发环境修改配置...
    }

    return {
      resolve: {
        extensions: ['.vue', '.ts'], // 后缀名省略配置
        alias: {
            // '@': resolve('./src')  默认配置了
            common: '@/common',
            assets: '@/assets',
            components: '@/components',
            views: '@/views'
        }
      },

      plugins: [
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [ElementPlusResolver()],
        }),
        // 打包时候的性能分析
        new BundleAnalyzerPlugin(),
      ],
    };
  },
});
