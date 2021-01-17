# eslint 配置

## 1. 安装
### eslint  /eslint/
### eslint-plugin-vue  /vue语法校验/
### eslint-plugin-import  /import语法校验/
### babel-eslint /对新标准及实验性语法校验/
<pre name="code" class="javascript">
npm install -D eslint eslint-plugin-vue eslint-plugin-import babel-eslint
</pre>
### @vue/cli-plugin-eslint
<pre name="code" class="javascript">
vue add eslint
</pre>


# vscode 配置
## 文件首选项 eslint设置
<pre name="code" class="javascript">
// vscode默认启用了根据文件类型自动设置tabsize的选项
"editor.detectIndentation": false,
// 重新设定tabsize
"editor.tabSize": 2,
// #值设置为true时，每次保存的时候自动格式化；值设置为false时，代码格式化请按shift+alt+F
"editor.formatOnSave": false,
// #每次保存的时候将代码按eslint格式进行修复
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
// 添加 vue 支持
"eslint.validate": [
  "javascript",
  "javascriptreact",
  "html",
  "vue",
]
</pre>
