// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    globals: {
        getComputedStyle: true,
        $: true,
        _: true,
        define: true,
        requirejs: true,
        lanto: true
    },
    env: {
        browser: false
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: 'standard',
    // required to lint *.vue files
    plugins: ['prettier', 'html'],
    // add your custom rules here
    rules: {
        // // allow paren-less arrow functions
        // 'arrow-parens': 0,
        // // allow async-await
        // 'generator-star-spacing': 0,
        // // allow debugger during development
        'no-tabs': 'off',
        'generator-star-spacing': 0,
        indent: 0,
        // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'prettier/prettier': 'error',
        // indent: ['error', 4],
        'space-before-function-paren': ['error', 'never'], //函数名后可以无空格
        'no-useless-constructor': 0,
        'spaced-comment': 0
    }
}
