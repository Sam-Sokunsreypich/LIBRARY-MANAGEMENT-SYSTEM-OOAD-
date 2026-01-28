export type Categories = {
  category_id: string;
  category_name: string;
}

export type Subcategories = {
  subcategory_id: string;
  subcategory_name: string;
  category_id: string;
}

export type Authors ={
    author_id?: string;
    author_first_name: string;
    author_last_name: string;
}
export type Books = {
    authorId: any;
    book_id: string;
    book_image: string;
    book_title: string;
    publication_year: string;
    book_total: number;
    book_location: string;
    book_description: string;
    author_id?: string;
    author : Authors;
    category_id: string;
    subcategory_id: string;
}