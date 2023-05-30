const P = require('../public')
const fs = require('fs');

module.exports = queryHttpInfo

const filePath = '@/../db/json/Http.json';

// 获取http统计信息
async function queryHttpInfo(ctx) {
    let data = ctx.request.body;
    const queryStr = data.queryStr;

    let queryResult;
    try {
        const jsonData = await readJsonData();
        const httpInfo = jsonData.result.Http;
        const ipInfo = jsonData.result.IpInfo;
        queryResult = httpInfo.find((http) => {
            enrichmentQuadruple(ipInfo,http);
            const chunks = http.chunks;
            return chunks.some(chunk => {
                return chunk.requestBodyPreview.includes(queryStr) || chunk.requestHeaders.includes(queryStr) || chunk.responseBodyPreview.includes(queryStr) || chunk.responseHeaders.includes(queryStr);
                return chunk.requestBodyPreview.includes(queryStr) || chunk.requestHeaders.includes(queryStr) || chunk.responseBodyPreview.includes(queryStr) || chunk.responseHeaders.includes(queryStr);
                return chunk.requestBodyPreview.includes(queryStr) || chunk.requestHeaders.includes(queryStr) || chunk.responseBodyPreview.includes(queryStr) || chunk.responseHeaders.includes(queryStr);
            });
        });
    } catch
        (err) {
        throw err; // 向外抛出异常
    }

    ctx.body = {
        success: true,
        message: "查询成功",
        data: {queryResult}
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




