export interface BookRequestType{
    id: number,
    created_at: string,
    email: string,
    book_title: string,
    status: string,
    took_book: boolean,
    book_issue: boolean,
    fine: number
}