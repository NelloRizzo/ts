export interface ICrudService<T> {
    create(entity: T | Array<T>): Promise<T | Array<T>>
    read(id: number): Promise<T | undefined>
    update(id: number, entity: T): Promise<T | undefined>
    delete(id: number): Promise<T | undefined>
}

export abstract class Filter<T> {
    abstract filter(entity: T): boolean
}

export interface IListableService<T> {
    findList(...params: Array<Filter<T>>): Promise<Array<T>>
}

export class Page<T> {
    private totalRecords: number
    private totalPages: number
    private pageSize: number
    private currentPage: number
    private isFirst: boolean
    private isLast: boolean
    private items: Array<T>

    constructor(items: Array<T>, totalRecords?: number, pageSize?: number, currentPage?: number) {
        this.totalRecords = totalRecords || items.length
        this.pageSize = pageSize || 50
        this.totalPages = Math.trunc(this.totalRecords / this.pageSize)
        this.currentPage = currentPage || 0
        this.isFirst = currentPage == 0
        this.isLast = currentPage == this.totalPages
        this.items = items
    }
}

export interface IPageable<T> {
    findPage(pageCount: number, pageSize?: number): Promise<Page<T>>
}