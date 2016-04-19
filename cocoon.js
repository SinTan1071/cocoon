#!/usr/bin/env node

var swig = require('swig');
var fs = require('fs-extra');
var colors = require('colors');
var argv = require('yargs').argv;
var exec = require('child_process').exec;

var viewBasePath = './src/views';
var scssBasePath = './src/scss';
var scriptsBasePath = './src/scripts';
var modelBasePath = scriptsBasePath + '/models';
var serviceBasePath = scriptsBasePath + '/services';
var directiveBasePath = scriptsBasePath + '/directives';
var controllerBasePath = scriptsBasePath + '/controllers';


function report(e) {
    if (e) {
        console.log(colors.red(e));
        process.exit();
    }
}

function getPathFileName(path) {
    var result = path.split('/');
    return result[result.length - 1];
}


function generateActionState(path) {

    var state = {};

    var result = path.split('/');


    if (result.length == 1) {

        state.name = result[0];
        state.url = '/' + result[0];
        state.templateUrl = 'views/' + result[0] + '.html';
        state.controllerUrl = 'controllers/' + result[0];

        return state;
    }

    var controller = result[0];

    result.shift();

    if (result.length == 1) {
        state.name = controller + '@' + result[0];
        state.url = '/' + controller + '/' + result[0];
        state.templateUrl = 'views/' + controller + '/' + result[0] + '.html';
        state.controllerUrl = 'controlles/' + controller + '/' + result[0];

        return state;
    }


    var actionUri = result.join('/');

    state.name = controller + '@' + actionUri;
    state.url = '/' + controller + '/' + actionUri;
    state.templateUrl = 'views/' + controller + '/' + actionUri + '.html';
    state.controllerUrl = 'controlles/' + controller + '/' + actionUri;

    return state;

}

function copyCocoonTemplate(name) {
    fs.copy(__dirname + '/template', './', function (e) {
        report(e);
        setNpmProjectName(name);
        setBowerProjectName(name);
    });
}


function setBowerProjectName(name) {

    fs.readJson('./bower.json', function (e, data) {
        report(e);

        data.name = name;

        fs.outputJson('./bower.json', data, function (e) {
            report(e);
        });
    });

}

function setNpmProjectName(name) {

    fs.readJson('./package.json', function (e, data) {

        report(e);

        data.name = name;

        fs.outputJson('./package.json', data, function (e) {
            report(e);
        });
    });

}


function createController(params) {
    for (var i in params) {

        var content = swig.renderFile(__dirname + '/files/action.tpl', {
            name: getPathFileName(params[i])
        });

        var file = controllerBasePath + '/' + params[i] + '.js';

        fs.outputFile(file, content, function (e) {

            report(e);

            console.log(colors.green('Add controller success.'));
            console.log(colors.yellow(file));
            createActionState(params[i]);
        });

        createTemplate('pages', params[i]);

        createActionScss('pages', params[i]);
    }
}

function createActionState(path) {
    fs.readJson('./src/config.json', function (e, config) {

        report(e);

        var result = generateActionState(path);

        var name = result.name;

        delete result.name;

        config.routes[name] = result;

        fs.outputJson('./src/config.json', config, function (e) {

            report(e);

            var response = {};

            response[name] = result;

            console.log(colors.green('Generate angular route state :'));
            console.log(colors.yellow(JSON.stringify(response, null, 2)));

        });
    });
}

function createTemplate(folder, path) {

    var content = swig.renderFile(__dirname + '/files/view.tpl', {
        name: getPathFileName(path),
        folder: folder
    });

    var file = viewBasePath + '/' + folder + '/' + path + '.html';

    fs.outputFile(file, content, function (e) {
        report(e);
    });

}

function createActionScss(folder, path) {

    var content = swig.renderFile(__dirname + '/files/scss.tpl', {
        name: getPathFileName(path),
        folder: folder
    });

    var file = scssBasePath + '/' + folder + '/' + path + '.scss';

    fs.outputFile(file, content, function (e) {
        report(e);
    });

}


function createModel(params) {
    for (var i in params) {

        var content = swig.renderFile(__dirname + '/files/model.tpl', {
            name: getPathFileName(params[i])
        });

        var file = modelBasePath + '/' + params[i] + '.js';

        fs.outputFile(file, content, function (e) {
            report(e);
            console.log(colors.green('Add model success.'));
            console.log(colors.yellow(file));
        });
    }
}

function createService(params) {
    for (var i in params) {

        var content = swig.renderFile(__dirname + '/files/service.tpl', {
            name: getPathFileName(params[i])
        });

        var file = serviceBasePath + '/' + params[i] + '.js';

        fs.outputFile(file, content, function (e) {
            report(e);

            console.log(colors.green('Add service success.'));
            console.log(colors.yellow(file));
        });
    }
}

function createDirective(params) {
    for (var i in params) {

        var content = swig.renderFile(__dirname + '/files/directive.tpl', {
            name: getPathFileName(params[i])
        });

        var file = directiveBasePath + '/' + params[i] + '.js';

        fs.outputFile(file, content, function (e) {
            report(e);

            console.log(colors.green('Add directive success.'));
            console.log(colors.yellow(file));
        });
    }
}

function renameController(o, n) {
    o = controllerBasePath + '/' + o + '.js';
    n = controllerBasePath + '/' + n + '.js';
    fs.move(o, n, function (e) {
        report(e);
        console.log(colors.green('rename controller success.'));
        console.log(colors.yellow(o + ' -> ' + n));
    });
}


function renameModel(o, n) {
    o = modelBasePath + '/' + o + '.js';
    n = modelBasePath + '/' + n + '.js';
    fs.move(o, n, function (e) {
        report(e);
        console.log(colors.green('rename model success.'));
        console.log(colors.yellow(o + ' -> ' + n));
    });
}

function renameService(o, n) {
    o = serviceBasePath + '/' + o + '.js';
    n = serviceBasePath + '/' + n + '.js';
    fs.move(o, n, function (e) {
        report(e);
        console.log(colors.green('rename service success.'));
        console.log(colors.yellow(o + ' -> ' + n));
    });
}

function renameDirective(o, n) {
    o = directiveBasePath + '/' + o + '.js';
    n = directiveBasePath + '/' + n + '.js';
    fs.move(o, n, function (e) {
        report(e);
        console.log(colors.green('rename directive success.'));
        console.log(colors.yellow(o + ' -> ' + n));
    });
}

function removeController(path) {

}


function removeModel(path) {

}

function removeService(path) {

}

function removeDirective(path) {

}

if (argv.new) {

    var name = argv.new === true ? 'cocoon' : argv.new;

    copyCocoonTemplate(name);

} else if (argv.create) {

    if (argv.create !== true) {

        switch (argv.create) {
            case 'controller':
                createController(argv._);
                break;
            case 'model':
                createModel(argv._);
                break;
            case 'service':
                createService(argv._);
                break;
            case 'directive':
                createDirective(argv._);
                break;
            default:
                break;
        }
    }

} else if (argv.rename) {

    if (argv.rename !== true) {

        switch (argv.rename) {
            case 'controller':
                renameController(argv._[0], argv._[1]);
                break;
            case 'model':
                renameModel(argv._[0], argv._[1]);
                break;
            case 'service':
                renameService(argv._[0], argv._[1]);
                break;
            case 'directive':
                renameDirective(argv._[0], argv._[1]);
                break;
            default:
                break;
        }
    }

} else if (argv.remove) {

    if (argv.remove !== true) {

        switch (argv.remove) {
            case 'controller':
                removeController(argv._);
                break;
            case 'model':
                removeModel(argv._);
                break;
            case 'service':
                removeService(argv._);
                break;
            case 'directive':
                removeDirective(argv._);
                break;
            default:
                break;
        }
    }

}



