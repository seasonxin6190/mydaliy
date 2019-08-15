
import Promise from "./promise";
const promise1 = new Promise();
console.log('Promise:', promise1.then());
var promise2 = promise1.then(function (value) {
    return console.log('eee');
}, function (reason) {
    throw new Error('sth went wrong')
})