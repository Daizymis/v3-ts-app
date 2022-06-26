import Mock from 'mockjs';

Mock.setup({
    timeout: '2000',
    debug: true
})

let configArray = [];
const files = require.context('.', true, /\.js$/);

files.keys().forEach(key => {
    if (key === './index.js') return;
    configArray = configArray.concat(files(key).default);
})

configArray.forEach(item => {
    for(let [path, target] of Object.entries(item)) {
        let protocol = path.split('|');
        Mock.mock(protocol[1], protocol[0], target);
    }
})