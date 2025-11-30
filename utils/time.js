"use strict";

module.exports = class {
    // Wait for all images under the element to finish loading
    static imgLoad = async (children) => {
        for (const element of children) {
            if (element.tagName === "IMG" && !element.complete) {
                await new Promise((resolve, reject) => {
                    element.onload = resolve;
                    element.onerror = reject;
                });
            }
            await this.bind(element.children);
        }
    };

    // wait
    static sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // De-shake
    static debounce = (func, delay = 250) => {
        let timer = null;

        return function (...args) {
            let context = this;

            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    };

    // throttle valve
    static throttle = (func, timeout = 250) => {
        let last;
        let timer;

        return function () {
            const context = this;
            const args = arguments;
            const now = +new Date();

            if (last && now < last + timeout) {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    last = now;
                    func.apply(context, args);
                }, timeout);
            } else {
                last = now;
                func.apply(context, args);
            }
        };
    };
};
