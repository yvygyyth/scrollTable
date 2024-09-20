import {
    usePost
} from '@/utils';

const activeTimers = {};

export const pollingInterface = ({ path, params, key = path},time = false, callback = null) => {
    const makeRequest = () => {
        return usePost(path, params)
            .then(response => {
                if (typeof callback === 'function') {
                    callback(response);
                }
                return response;
            })
            .catch(error => {
                throw error;
            });
    };

    if (activeTimers[key]) {
        clearInterval(activeTimers[key].timer); // 停止已有的轮询
        console.log(`停止已有的轮询: ${key}`);
    }
    makeRequest();
    if (time) {
        const timer = setInterval(() => {
            makeRequest();
        }, time);

        activeTimers[key] = {
            timer,
            stop: () => clearInterval(timer)
        };
        return activeTimers[key];
    }
};