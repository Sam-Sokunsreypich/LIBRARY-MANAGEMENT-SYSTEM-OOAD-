export interface BookRequestType {
    id: number;
    created_at: string;
    request_status:{
        id:number;
        status_name:string;
    }
    took_book: boolean;
    book_issue: boolean;
    fine: number;
    member: {
      id: number;
      email: string;
      name: string;
    };
    book: {
      id: number;
      title: string;
    };
  }
  