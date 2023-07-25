export class Filter {
}
export class Page {
    totalRecords;
    totalPages;
    pageSize;
    currentPage;
    isFirst;
    isLast;
    items;
    constructor(items, totalRecords, pageSize, currentPage) {
        this.totalRecords = totalRecords || items.length;
        this.pageSize = pageSize || 50;
        this.totalPages = Math.trunc(this.totalRecords / this.pageSize);
        this.currentPage = currentPage || 0;
        this.isFirst = currentPage == 0;
        this.isLast = currentPage == this.totalPages;
        this.items = items;
    }
}
