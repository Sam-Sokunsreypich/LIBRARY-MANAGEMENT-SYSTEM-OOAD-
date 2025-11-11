export interface BookRequestType {
    id: number;
    created_at: string;
    request_status:{
        id:number;
        status_name:string;
    };
    took_book: boolean;
    book_issue: boolean;
    fine: number;
    member: {
      id: number;
      email: string;
      name: string;
    };
    books: {
      id: number;
      book_title: string;
      book_image:string
    };
    reject_reason:string;
    start_date: string;
    end_date:string;
  }
  