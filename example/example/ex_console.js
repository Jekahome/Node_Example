

// $ node ex_console.js param1=123 param2=test

const [path_node,script_name,...params] = process.argv;
console.log(path_node);// /home/jeka/.nvm/versions/node/v15.8.0/bin/node
console.log(script_name);// /home/jeka/projects/node/example/ex_console.js

// param1=123
// param2=test
for(let i=0;i<params.length;i++){
    console.log(params[i]);
}


