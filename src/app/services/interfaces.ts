export interface ApiResult {
    current_page: number;
    data: Cat[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

export interface Cat {
    breed: string;
    country: string;
    origin: string;
    coat: string;
    pattern: string;
}