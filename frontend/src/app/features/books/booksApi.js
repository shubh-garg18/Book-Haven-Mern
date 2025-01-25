import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/books`,
    credentials: "include",

    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return headers;
    },
});
const booksApi = createApi({
    reducerPath: "booksApi",
    baseQuery,
    endpoints: (builder) => ({
        // get query post mutation just like graphql
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["Books"],
        }),
        fetchBookById: builder.query({
            query: (id) => {
                if (!id) return "";
                return `/${id}`;
            },
            providesTags: (result, error, id) => [{ type: "Books", id }],
        }),        
        addBook: builder.mutation({
            query: (newBook) => ({
                url: "/create-book",
                method: "POST",
                body: newBook,
            }),
            invalidatesTags: ["Books"],
        }),
        updateBook: builder.mutation({
            query: ({ id, ...updatedBook }) => ({
                url: `/edit/${id}`,
                method: "PATCH",
                body: updatedBook,
                headers: {
                    "Content-type": "application/json",
                },
            }),
            invalidatesTags: ["Books"],
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Books"],
        }),
    }),
});

export const {
    useFetchAllBooksQuery,
    useFetchBookByIdQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = booksApi;

export default booksApi;
