import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { INVENTIONS_DETAIL, INVENTIONS_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';

export const useInventionList = (tableParams) => {
    const { sort = "desc", sortColumn = "id" } = tableParams.sorter;
    const { pageSize: limit = PAGE_SIZE, current: page = 1 } =
        tableParams.pagination;

    return useQuery([INVENTIONS_LIST, sort, sortColumn, limit, page], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.INVENTIONS.LIST}`,
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

export const useInventionsDetail = (InventionsId) => {
    return useQuery([INVENTIONS_DETAIL], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.INVENTIONS.UPDATE}`.replace(':id', InventionsId))

        return data;
    })
}

export const useInventionsDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (InventionsId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.INVENTIONS.UPDATE.replace(":id", InventionsId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(INVENTIONS_LIST);
            },
        }
    );
};

export const useCreateInventions = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.INVENTIONS.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(INVENTIONS_LIST);
            },
        }
    );
};

export const useUpdateInventions = (InventionsId) => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.put(`${API.API_ROOT}${API.INVENTIONS.UPDATE}`.replace(':id', InventionsId), data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(INVENTIONS_LIST);
            },
        }
    );
};