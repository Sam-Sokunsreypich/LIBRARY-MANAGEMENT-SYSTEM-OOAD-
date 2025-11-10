export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string; // e.g., "/book-covers/the-kite-runner.jpg"
  copiesAvailable: number;
  createdAt: string;
}
