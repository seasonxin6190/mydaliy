function utils() {
    return new Promise((resolve, reject) => {
        resolve(99);
    }).then(res => console.log('res:', res));
}

const fetchData = function() {
    return utils().then(res => {
        console.log('fetchData: res', res);
        return Promise.resolve('resX:', res);
    });
}
fetchData().then(res => console.log('ex res:', res));