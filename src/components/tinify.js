const tinify = require('tinify');
tinify.key = 'xqQjVrcL3HpBN67CxVR54F1YH389Zx2Q';
const source = tinify.fromUrl('https://w.wallhaven.cc/full/j3/wallhaven-j3m8y5.png')
source.toFile("optimized.png");
