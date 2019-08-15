"use strict";

// 未添加异步处理等其他边界情况
// ①自动执行函数，②三个状态，③then
var Promise =
    /*#__PURE__*/
    function () {
        function Promise(fn) {
            var _this = this;

            // 三个状态
            this.state = 'pending';
            this.value = undefined;
            this.reason = undefined;

            var resolve = function resolve(value) {
                if (_this.state === 'pending') {
                    _this.state = 'fulfilled';
                    _this.value = value;
                }
            };

            var reject = function reject(value) {
                if (_this.state === 'pending') {
                    _this.state = 'rejected';
                    _this.reason = value;
                }
            }; // 自动执行函数


            try {
                fn(resolve, reject);
            } catch (e) {
                reject(e);
            }
        } // then


        var _proto = Promise.prototype;

        _proto.then = function then(onFulfilled, onRejected) {
            switch (this.state) {
                case 'fulfilled':
                    onFulfilled();
                    break;

                case 'rejected':
                    onRejected();
                    break;

                default:
            }
        };

        return Promise;
    }();