const P = require('../public')

module.exports = pageUtil

async function pageUtil(page_size, current_page, data) {

    const pageSize = Math.abs(page_size >> 0) || 10; // 每页的条目数量
    let currentPage = Math.abs(current_page >> 0) || 1; // 当前页码

    const total = data.length;
    const totalPages = Math.ceil(total / pageSize); // 总页数

    const pages = Math.ceil(total / pageSize);
    if (currentPage > pages) {
        currentPage = Math.max(1, pages); // 以防没数据
    }
    // 偏移量
    const offset = (currentPage - 1) * pageSize; // 起始索引
    const endIndex = offset + pageSize; // 结束索引

    const paginatedArray = data.slice(offset, endIndex);

    const pagerJson = {
        total: total,
        totalPages: totalPages,
        currentPage: currentPage,
        pageSize: pageSize,
        startIndex: offset,
        endIndex: endIndex,
        paginatedArray: paginatedArray
    };
    return pagerJson;
}
