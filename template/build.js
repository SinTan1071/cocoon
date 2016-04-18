({
    appDir: './src',
    baseUrl: './scripts',
    dir: './dist',
    mainConfigFile: "./src/scripts/main.js",
    include: "./src/scripts/main",
    modules: [
        {
            name: 'main'
        }
    ],
    // fileExclusionRegExp: /^(r|build|bower)\.js$/,
    optimizeCss: 'standard',
    // removeCombined: true,
    optimize: "uglify2"
});