export interface Page<T> {
    content: T[];
    page: number;           // 0-based
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}