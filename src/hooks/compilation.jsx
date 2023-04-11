import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { COMPILATION_DETAIL, COMPILATION_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';

export const useCompilationList = (tableParams) => {
    const { sort = "desc", sortColumn = "id" } = tableParams.sorter;
    const { pageSize: limit = PAGE_SIZE, current: page = 1 } =
        tableParams.pagination;

    return useQuery([COMPILATION_LIST, sort, sortColumn, limit, page], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.COMPILATION.LIST}`,
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

export const useCompilationDetail = (compilationId) => {
    return useQuery([COMPILATION_DETAIL], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.COMPILATION.UPDATE}`.replace(':id', compilationId))

        return data;
    })
}

export const useCompilationDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (compilationId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.COMPILATION.UPDATE.replace(":id", compilationId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(COMPILATION_LIST);
            },
        }
    );
};

export const useCreateCompilation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.COMPILATION.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(COMPILATION_LIST);
            },
        }
    );
};