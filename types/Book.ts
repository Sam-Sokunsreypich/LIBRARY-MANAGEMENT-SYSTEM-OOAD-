export interface Book {
  book_id: number;
  book_title: string;
  author: {
    author_id:number
    first_name: string,
    last_name:string,  
  };
  book_image: string;
  book_total: number;
  book_description: string;
  publication_year: number;
  subcategory_id:string;
  category_id: string; 
  created_at: string;
  user_id: string;
  book_location: string
  author_name?:string;
}
