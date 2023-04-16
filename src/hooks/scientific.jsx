import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SCIENTIFIC_DETAIL, SCIENTIFIC_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';

export const useScientificList = (tableParams) => {
    const { sort = "desc", sortColumn = "id" } = tableParams.sorter;
    const { pageSize: limit = PAGE_SIZE, current: page = 1 } =
        tableParams.pagination;

    return useQuery([SCIENTIFIC_LIST, sort, sortColumn, limit, page], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.SCIENTIFIC.LIST}`,
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

export const useScientificDetail = (scientificId) => {
    return useQuery([SCIENTIFIC_DETAIL], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.SCIENTIFIC.UPDATE}`.replace(':id', scientificId))

        return data;
    })
}

export const useScientificDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (scientificId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.SCIENTIFIC.UPDATE.replace(":id", scientificId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(SCIENTIFIC_LIST);
            },
        }
    );
};

export const useCreateScientific = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.SCIENTIFIC.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(SCIENTIFIC_LIST);
            },
        }
    );
};