const P = require('../public')
const fs = require('fs');
const pageUtil = require('../utils/pageUtil.js')

const filePath = '@/../db/json/Http.json';
// 匹配以GET或POST开头的行的正则表达式
const methodRegex = /^(GET|POST|HEAD|OPTIONS|PUT|PATCH|DELETE|CONNECT)\s+/gm;
// 匹配Content-Type正则表达式
const contentTypeRegex = /Content-Type:\s*([^\s;]+)/i;

module.exports = analyzeHttpData

// 获取http统计信息
async function analyzeHttpData(ctx) {
    let data = ctx.request.body;
    const currentPage = data.currentPage
    const pageSize = data.pageSize

    const jsonData = await readJsonData();
    const httpInfo = jsonData.result.Http;
    const ipInfo = jsonData.result.IpInfo;

    const analyzeResult = await analyzeHttp(httpInfo);
    const pagerJson = await pageUtil(pageSize, currentPage, await proceData(ipInfo, httpInfo));
    ctx.body = {
        success: true,
        message: "获取成功",
        data: {analyzeResult, pagerJson}
    }
}


// 读取JSON文件
async function readJsonData() {
    try {
        const data = await fs.promises.readFile(filePath);
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        throw err;
    }
}

async function analyzeHttp(httpInfo) {
    let analyzeResult = {}
    let methodCount = {
        GET: 0,
        POST: 0,
        HEAD: 0,
        OPTIONS: 0,
        PUT: 0,
        PATCH: 0,
        DELETE: 0,
        CONNECT: 0,
    };
    let statusCodeCount = {
        '200': 0,
        '200 OK': 0,
    };
    let contentTypeCount = {};

    httpInfo.forEach((http) => {
        const chunks = http.chunks;
        chunks.forEach((chunk) => {
            //统计HTTP请求方法个数
            const methodMatch = chunk.requestHeaders.match(methodRegex);
            if (methodMatch) {
                const method = methodMatch[0].trim();
                methodCount[method] = (methodCount[method] || 0) + 1;
            }
            //统计http响应状态码个数
            const responseHeaders = chunk.responseHeaders;
            const matches200 = responseHeaders.match(/200(?!\sOK)/g) || [];
            statusCodeCount['200'] += matches200.length;
            const matches200OK = responseHeaders.match(/200\sOK/g) || [];
            statusCodeCount['200 OK'] += matches200OK.length;

            const requestContentTypeMatch = chunk.requestHeaders.match(contentTypeRegex);
            if (requestContentTypeMatch) {
                const requestContentType = requestContentTypeMatch[1];
                contentTypeCount[requestContentType] = (contentTypeCount[requestContentType] || 0) + 1;
            }

            // 统计http响应Content-Type个数
            const responseContentTypeMatch = chunk.responseHeaders.match(contentTypeRegex);
            if (responseContentTypeMatch) {
                const responseContentType = responseContentTypeMatch[1];
                contentTypeCount[responseContentType] = (contentTypeCount[responseContentType] || 0) + 1;
            }
        });
    });
    analyzeResult.methodCount = methodCount;
    analyzeResult.statusCodeCount = statusCodeCount;
    analyzeResult.contentTypeCount = contentTypeCount;
    return analyzeResult;
}


//循环处理
function proceData(ipInfo, httpInfo) {
    const requestLineRegex = /^([A-Z]+)\s/;
    //http中ip访问四元组数组
    httpInfo.forEach((http) => {
        enrichmentQuadruple(ipInfo, http);
    });
    return httpInfo;
}

//处理四元组信息，并富化数据
function enrichmentQuadruple(ipInfo, http) {

    const matchedIp = ipInfo.find(item => item.ip === http.dstIP);

    let srcStr = `${http.srcIP}:${http.srcPort}`;
    let dstStr = ``;

    if (matchedIp) {
        dstStr = `${matchedIp.domain} (${http.dstIP}):${http.dstPort}`;
    } else {
        dstStr = `${http.dstIP}:${http.dstPort}`;
    }

    //这里获取访问方法并拼接
    const requestLineRegex = /^([A-Z]+)\s/;
    const chunks = http.chunks;
    let set = new Set();
    chunks.forEach((chunk) => {
        const requestHeaders = chunk.requestHeaders;
        const match = requestHeaders.match(requestLineRegex);
        if (match) {
            set.add(match[1])
        }
    });
    const requestMethod = `${Array.from(set).join(',')}`
    http.srcStr = srcStr;
    http.dstStr = dstStr;
    http.requestMethod = requestMethod;


    return http;

}

