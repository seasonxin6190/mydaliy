/**
 * 抖动：
 * 当某一个事件频繁触发时，将其设置成在规定的时间内触发，防止一直触发
 * 短时间内不断触发某个事件，非常消耗性能
 * 
 * 防抖：
 *  打断
 */

debounce = (func, delay) => {
    let timer = null;
    return args => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func && func(args)
        }, delay);
    }
}

/** 
 * 
 * 
*/
throttle = (func, delay) => {
    let status = 'start';
    if(status === 'waitting') return;
    status = 'waitting';
    return args => {
        setTimeout(() => {
           func && func()
           status = 'start'; 
        }, delay);
    }
} 