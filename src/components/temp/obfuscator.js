// js混淆
const JO = require("javascript-obfuscator");
let code = `
        function add(first, second) { return first + second; }; 
        var v = add(1,2); 
        console.log(v);
`;
let result = JO.obfuscate(code,
    {
        compact: false,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        shuffleStringArray: true,
        splitStrings: true,
        stringArrayThreshold: 1,
    }
);
console.log("混淆结果：", result.getObfuscatedCode())
// js压缩
const {minify} = require("terser");
code = `
        function add(first, second) { return first + second; }; 
        var v = add(1,2); 
        console.log(v);
`;
result = await minify(code);
console.log("压缩结果：", result.code)
// js、css、html压缩与混淆汇总：
// https://juejin.cn/post/6997595726188380168
