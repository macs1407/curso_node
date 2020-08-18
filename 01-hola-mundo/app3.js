console.log('inicio programa');

setTimeout(function(){
    console.log('primer time out');
}, 3000);

setTimeout(function(){
    console.log('segundo time out');
}, 0);

setTimeout(function(){
    console.log('tercer time out');
}, 0);

console.log('fin del programa');