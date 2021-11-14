const { stdout, stdin, stderr, exit, exitCode } = process;
var c1_function = require('./c1_cipher');
var c0_function = require('./c0_cipher');
var r1_function = require('./r1_cipher');
var r0_function = require('./r0_cipher');
var a_function = require('./a_cipher');

const flag_c = process.argv[2];
const allowedFlags = ['-c', '-i', '-o'];
const check = process.argv.slice(2);

function getValue(x) {
    const flagIndex = process.argv.indexOf(x);
    return flagIndex !== -1 ? process.argv[flagIndex + 1] : null;
}

if (!allowedFlags.includes(flag_c)) {
    process.exitCode = 1;
    stderr.write(`There is miss of '-c' config. Status code is - ${process.exitCode}.\nTry it again`);
    exit();
}

var k=0;
var l=0;
var m=0;
for(var i=0; i<check.length; i++){
    if(check[i]==='-c'){k++}
    if(check[i]==='-i'){l++}
    if(check[i]==='-o'){m++}
}
const message = getValue('-c');
const strArray = message.split('-');

var output;

if(k>1){
    process.exitCode = 2;
    stderr.write(`Error: You provided -c argument more than once. Status code is - ${process.exitCode}.\nTry it again.`);
    exit();
}
if(l>1){
    process.exitCode = 2;
    stderr.write(`Error: You provided -i argument more than once. Status code is - ${process.exitCode}.\nTry it again.`);
    exit();
}
if(m>1){
    process.exitCode = 2;
    stderr.write(`Error: You provided -o argument more than once. Status code is - ${process.exitCode}.\nTry it again.`);
    exit();
}

var fs = require('fs');
var input;
if(l!=0){
    input = getValue('-i');

    var readStream = fs.createReadStream(input);
    readStream.setEncoding("utf8");
    readStream.on("data", (chunk) => {
        for(var i = 0; i<strArray.length; i++){
            if(strArray[i].charAt(0)=='C'){
                if (strArray[i].charAt(1)=='1'){
                    chunk = c1_function.cesar(chunk);
                }
                else if (strArray[i].charAt(1)=='0'){
                    chunk = c0_function.cesar(chunk);
                }
                else {
                    process.exitCode = 3;
                    stderr.write(`There is an incorrect config, after letter C should be 1 or 0.\nExample: -c C1-C1-C0-A-R1-R1-R0. Status code is - ${process.exitCode} \nTry it again`);
                    exit();
                }
            }
            else if (strArray[i].charAt(0)=='R'){
                if(strArray[i].charAt(1)=='1'){
                    chunk = r1_function.cesar(chunk);
                }
                else if(strArray[i].charAt(1)=='0'){
                    chunk = r0_function.cesar(chunk);
                }
                else {
                    process.exitCode = 4;
                    stderr.write(`There is an incorrect config, after letter R should be 1 or 0.\nExample: -c C1-C1-C0-A-R1-R1-R0. Status code is ${process.exitCode}\nTry it again`);
                    exit();
                }
            }
            else if (strArray[i].charAt(0)=='A'){
                chunk = a_function.cesar(chunk);
            }
            else {
                process.exitCode = 5;
                stderr.write(`There is an incorrect config.\nExample: -c C1-C1-C0-A-R1-R1-R0. Status code is - ${process.exitCode}\nTry it again`);
                exit();
            }
        }
        if(m!=0){    
            output = getValue('-o');
            fs.appendFile(output, chunk, function (err) {
                if (err) throw err;
            });
        }
        else {
            stdout.write(chunk, function (err){
                if (err) throw err;
            });
        }
    })
    readStream.on("error", (error) => {
        console.log(error.stack);
    });
}
else {
    var yeap = "";
    stdin.on('data', data => yeap = yeap.concat("",data));

    function exitHandler(options, exitCode){
        if(options.cleanup){

            for(var i = 0; i<strArray.length; i++){
                if(strArray[i].charAt(0)=='C'){
                    if (strArray[i].charAt(1)=='1'){
                        yeap = c1_function.cesar(yeap);
                    }
                    else if (strArray[i].charAt(1)=='0'){
                        yeap = c0_function.cesar(yeap);
                    }
                    else {
                        process.exitCode = 3;
                        stderr.write(`There is an incorrect config, after letter C should be 1 or 0.\nExample: -c C1-C1-C0-A-R1-R1-R0. Status code is - ${process.exitCode} \nTry it again`);
                        exit();
                    }
                }
                else if (strArray[i].charAt(0)=='R'){
                    if(strArray[i].charAt(1)=='1'){
                        yeap = r1_function.cesar(yeap);
                    }
                    else if(strArray[i].charAt(1)=='0'){
                        yeap = r0_function.cesar(yeap);
                    }
                    else {
                        process.exitCode = 4;
                        stderr.write(`There is an incorrect config, after letter R should be 1 or 0.\nExample: -c C1-C1-C0-A-R1-R1-R0. Status code is ${process.exitCode}\nTry it again`);
                        exit();
                    }
                }
                else if (strArray[i].charAt(0)=='A'){
                    yeap = a_function.cesar(yeap);
                }
                else {
                    process.exitCode = 5;
                    stderr.write(`There is an incorrect config.\nExample: -c C1-C1-C0-A-R1-R1-R0. Status code is - ${process.exitCode}\nTry it again`);
                    exit();
                }
            }
            if(m!=0){
                output = getValue('-o');
                fs.appendFile(output, yeap, function (err) {
                    if (err) console.log(err);
                });
            }
            else {
                stdout.write(yeap, function (err){
                    if (err) throw err;
                });
            }
        }
        if (options.exit){
            process.exit();
        }
    }
    process.on('exit', exitHandler.bind(null,{cleanup:true}));

    //catches ctrl+c event
    process.on('SIGINT', exitHandler.bind(null, {exit:true}));
}