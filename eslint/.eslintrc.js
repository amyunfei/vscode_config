module.exports = {
  root: true, // 标识当前配置文件为eslint的根配置文件，让其停止在父级目录中继续寻找。
  /**
   * 解析器
   * ESLint 默认使用Espree作为其解析器
   * Espree：默认解析器，一个从Esprima中分离出来的解析器，做了一些优化
   * Esprima：js标准解析器
   * Babel-ESLint： 一个对Babel解析器的包装，如果我们的代码需要经过babel转化，则对应使用这个解析器
   * typescript-eslint-parser(实验) - 一个把 TypeScript 转换为 ESTree 兼容格式的解析器
   */
  
  /**
   * 解析器选项
   * "sourceType": "module",  // 指定JS代码来源的类型，script(script标签引入？) | module（es6的module模块
   * "ecmaVersion": 6,     // 支持的ES语法版本，默认为5。注意只是语法，不包括ES的全局变量。全局变量需要在env选项中进行定义
   */
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 6
  },
  /**
   * 规则继承
   * 可继承的方式有以下几种:
   * eslint内置推荐规则 「eslint:recommended」
   * 可共享的配置， 是一个 npm 包，它输出一个配置对象。即通过npm安装到node_module中, 可共享的配置可以省略包名的前缀 eslint-config-，即实际设置安装的包名是 eslint-config-airbnb-base
   * 插件中获取的规则，书写规则为 「plugin:插件包名/配置名」，其中插件报名也是可以忽略「eslint-plugin-」前缀。如'plugin:vue/essential'
   * 从配置文件中继承，即继承另外的一个配置文件，如'./node_modules/coding-standard/eslintDefaults.js'
   */
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  /**
   * 运行环境
   * 获得了特定环境的全局定义，就不会认为是开发定义的，跳过对其的定义检测。否则会被认为该变量未定义 not defined
   * browser - 浏览器环境中的全局变量。
   * node - Node.js 全局变量和 Node.js 作用域。
   * es6 - 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
   * amd - 将 require() 和 define() 定义为像 amd 一样的全局变量。
   * commonjs - CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)。
   * jquery - jQuery 全局变量。
   * mongo - MongoDB 全局变量。
   * worker - Web Workers 全局变量。
   * serviceworker - Service Worker 全局变量。
   */
  env: {
    browser: true,
    node: true,
    es6: true
  },
  /**
   * 全局变量
   * 定义额外的全局，开发者自定义的全局变量，让其跳过no-undef 规则
   * key值就是额外添加的全局变量
   * value值用于标识该变量能否被重写，类似于const的作用。true为允许变量被重写
   * 注意：要启用no-global-assign规则来禁止对只读的全局变量进行修改。
   */
  globals: {},
  /**
   * 插件
   * http://eslint.cn/docs/user-guide/configuring#configuring-plugins
   * 插件同样需要在node_module中下载
   * 注意插件名忽略了「eslint-plugin-」前缀，所以在package.json中，对应的项目名是「eslint-plugin-vue」
   * 插件的作用类似于解析器，用以扩展解析器的功能，用于检测非常规的js代码。也可能会新增一些特定的规则。
   * 如 eslint-plugin-vue，是为了帮助我们检测.vue文件中 <template> 和 <script> 中的js代码
   */
  plugins: ['vue'],
  /**
   * 自定义规则
   * http://eslint.cn/docs/user-guide/configuring#configuring-rules
   * "off" 或者0 关闭规则
   * "warn" 或者1 将规则打开为警告（不影响退出代码）
   * "error" 或者2 将规则打开为错误（触发时退出代码为1）
   * 如果某项规则，有额外的选项，可以通过数组进行传递，而数组的第一位必须是错误级别。如0,1,2
   */
  rules: {
    // 自定义您的规则
    // Customize your rules
    'quotes': [1, 'single'], // 使用单引号
    'semi': [2, 'never'], // 结尾不使用分号
    'prefer-const': 1, //首选const
    'indent': ['error', 2],


    // ---vue 配置--- (https://eslint.vuejs.org/rules/)
    // 模板属性连字 my-prop myProp  (https://eslint.vuejs.org/rules/attribute-hyphenation.html)
    // "vue/attribute-hyphenation": ["error", "always" | "never", { "ignore": [] }],
    // 组件名称格式定义 'PascalCase' | 'kebab-case'  大驼峰 MyComponent | kebab my-component
    // 'vue/component-definition-name-casing': ['error', 'PascalCase' | 'kebab-case'],
    // 标签每行属性数量及换行
    'vue/max-attributes-per-line': ['warn', {
      'singleline': 5, // 当开始标记在一行中时，每行的最大属性数。默认值为1。
      'multiline': {
        'max': 5,
        'allowFirstLine': false // 如果为true，则允许属性与该标记名称位于同一行。默认值为false
      }
    }],
    // 标签自闭合
    'vue/html-self-closing': ['warn', { // never(禁止自动闭合) always(自动闭合无内容标签)
      'html': {
        'void': 'never', // 自闭合标签 img
        'normal': 'always', // 普通标签
        'component': 'always' // 组件标签
      },
      'svg': 'always', // svg标签
      'math': 'always' // MathML标签
    }],
    // 模板中引号格式
    // 错误类型 | 单引号或双引号或都可以 | 允许字符串使用单引号或双引号，只要字符串包含必须转义的引号。
    'vue/html-quotes': [ 'error', 'double', { 'avoidEscape': false } ],
    // 括号模板中是否空格 {{ variable }}
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    // 模板中无用的空格    是否忽略属性中对象属性的空格
    'vue/no-multi-spaces': ['error', { 'ignoreProperties': false }],
    // prop属性命名格式 'camelCase' | 'snake_case'  驼峰 | 蛇形
    'vue/prop-name-casing': ['error', 'camelCase'],
    // 为prop属性设置默认值
    'vue/require-default-prop': 'error',
    // 为prop属性设置类型
    'vue/require-prop-types': 'error',
    // v-bind 格式规定  "shorthand" | "longform"  简写:name="xxx" | v-bind:name="xxx"
    'vue/v-bind-style': ['error', 'shorthand'],
    // v-on 格式规定 同v-bind
    'vue/v-on-style': ['error', 'shorthand']
  }
}