#!/usr/bin/env node

var swig = require('swig');
var fs = require('fs-extra');
var argv = require('yargs').argv;
var exec = require('child_process').exec;

var scriptsBasePath = './src/scripts';
var modelBasePath = scriptsBasePath + '/models';
var serviceBasePath = scriptsBasePath + '/services';
var directiveBasePath = scriptsBasePath + '/directives';
var controllerBasePath = scriptsBasePath + '/controllers';


function report(e) {
    if (e) {
        throw e;
    }
}

function getPathFileName(path) {
    var result = path.split('/');
    return result[result.length - 1];
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
        fs.mkdirsSync(controllerBasePath + '/' + params[i], function (e) {
            report(e);
        });
    }
}

function createAction(params) {
    for (var i in params) {

        var content = swig.renderFile(__dirname + '/files/action.tpl', {
            name: getPathFileName(params[i])
        });

        fs.outputFile(controllerBasePath + '/' + params[i] + '.js', content, function (e) {
            report(e);
        });
    }
}

function createModel(params) {
    for (var i in params) {

        var content = swig.renderFile(__dirname + '/files/model.tpl', {
            name: getPathFileName(params[i])
        });

        fs.outputFile(modelBasePath + '/' + params[i] + '.js', content, function (e) {
            report(e);
        });
    }
}

function createService(params) {
    for (var i in params) {

        var content = swig.renderFile(__dirname + '/files/service.tpl', {
            name: getPathFileName(params[i])
        });

        fs.outputFile(serviceBasePath + '/' + params[i] + '.js', content, function (e) {
            report(e);
        });
    }
}

if (argv.init) {

    copyCocoonTemplate(argv.init);

}else if (argv.create) {

    var action = argv.create;
    var params = argv._;
    switch (action) {
        case 'controller':
            createController(params);
            break;
        case 'action':
            createAction(params);
            break;
        case 'model':
            createModel(params);
            break;
        case 'service':
            createService(params);
            break;
        default:
            break;
    }

}else{
    
}


