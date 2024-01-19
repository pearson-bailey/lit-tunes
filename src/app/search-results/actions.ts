"use server";

interface SuccessResponse {
  success: true;
}

interface FailureResponse {
  message: string;
  success: false;
}

export type SearchActionResponse = SuccessResponse | FailureResponse;

export type Genre = {
  list_name: string;
  display_name: string;
  list_name_encoded: string;
  oldest_publisehd_date: string;
  newest_published_date: string;
  updated: string;
};

export type Book = {
  rank: number;
  rank_last_week: number;
  weeks_on_list: number;
  asterisk: number;
  dagger: number;
  primary_isbn10: string;
  primary_isbn13: string;
  publisher: string;
  description: string;
  price: string;
  title: string;
  author: string;
  contributor: string;
  contributor_note: string;
  book_image: string;
  book_image_width: number;
  book_image_height: number;
  amazon_product_url: string;
  age_group: string;
  book_review_link: string;
  first_chapter_link: string;
  sunday_review_link: string;
  article_chapter_link: string;
  isbns: {
    isbn10: string;
    isbn13: string;
  }[];
  buy_links: {
    name: string;
    url: string;
  }[];
  book_uri: string;
};

export async function getBookGenres(): Promise<Genre[]> {
  try {
    var requestOptions = {
      method: "GET",
    };

    const res = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=GBPCyNBMXnwAGo87xL6TJpp4QX3pxQMC`,
      requestOptions
    );

    if (res.ok) {
      const data = await res.json();
      return data.results as Genre[];
    } else {
      throw new Error(`Failed to fetch genres. Status: ${res.status}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch genres. Error: ${error}`);
  }
}

export async function searchBooksByGenre(genre: string): Promise<Book[]> {
  try {
    var requestOptions = {
      method: "GET",
    };
    const res = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/${genre}.json?api-key=GBPCyNBMXnwAGo87xL6TJpp4QX3pxQMC`,
      requestOptions
    );

    if (res.ok) {
      const data = await res.json();
      return data.results.books as Book[];
    } else {
      throw new Error(`Failed to fetch genres. Status: ${res.status}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch genres. Error: ${error}`);
  }
}
