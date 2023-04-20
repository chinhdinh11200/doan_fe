import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BOOKS_DETAIL, BOOKS_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';

export const useBookList = (tableParams) => {
    const { sort = "desc", sortColumn = "id" } = tableParams.sorter;
    const { pageSize: limit = PAGE_SIZE, current: page = 1 } =
        tableParams.pagination;

    return useQuery([BOOKS_LIST, sort, sortColumn, limit, page], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.BOOKS.LIST}`,
            {
                params: {
                    sort: sort,
                    sortColumn: sortColumn,
                    limit: limit,
                    offset: page == 1 ? page - 1 : page
                },
            })

        return { data, total: headers["x-total-count"] };
    })
}

export const useBooksDetail = (BookId) => {
    return useQuery([BOOKS_DETAIL], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.BOOKS.UPDATE}`.replace(':id', BookId))

        return data;
    })
}

export const useBooksDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (BookId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.BOOKS.UPDATE.replace(":id", BookId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(BOOKS_LIST);
            },
        }
    );
};

export const useCreateBooks = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.BOOKS.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(BOOKS_LIST);
            },
        }
    );
};

export const useUpdateBooks = (BookId) => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.put(`${API.API_ROOT}${API.BOOKS.UPDATE}`.replace(':id', BookId), data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(BOOKS_LIST);
            },
        }
    );
};