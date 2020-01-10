'use strict';

const priter= require('qtnode-middleware-console');
const childProcess = require('./utils/childProcess');
const path = require('path');

async function a (next) {
    priter.info('正在进行静态代码规范检测>>>>>>>>>>>>>', path.resolve(__dirname, '../', './'));


    let cmd = 'eslint --color  --fix';
    cmd += ` ${ path.resolve(process.cwd(), 'entry/')}`;
    cmd += ` --rulesdir  ${path.resolve(__dirname, '../')}`;
    cmd += ` ${ path.resolve(process.cwd(), 'src/')} ${ path.resolve(process.cwd(), 'wpconf/')}`;
    console.log(cmd);

    await childProcess.execPromise(cmd, {encoding: 'utf8', cwd: process.cwd()})

    //
    // await childProcess.spawnPromise('eslint',
    //     [
    //         '--color',
    //         '--rulesdir ' + path.resolve(__dirname, '../'),
    //         path.resolve(process.cwd(), 'entry/'),
    //         path.resolve(process.cwd(), 'src/'),
    //         path.resolve(process.cwd(), 'wpconf/')
    //     ],
    //     {encoding: 'utf8', cwd: process.cwd()}
    // )
        .then((data) => {
            priter.data(data);
            let arrErr = data.match(/problems \((.*?) errors/);
            let arrWaring = data.match(/errors, (.*?) warnings/);
            if(arrErr != null && arrErr != null)
                priter.warn('扫描出 错误:' + arrErr[1] + ' warings:' + arrWaring[1]);
            priter.tip('静态代码规范检测通过 ');


        })
        .catch((data) => {
            console.log(data, '----');
            priter.data(data);


            let arrErr = data.match(/problems \((.*?) errors/);
            let arrWaring = data.match(/errors, (.*?) warnings/);
            if(arrErr != null && arrErr != null)
                priter.error('扫描出 错误:' + arrErr[1] + ' warings:' + arrWaring[1]);
            priter.tip('静态代码规范检测未通过');


        });

}
a();


