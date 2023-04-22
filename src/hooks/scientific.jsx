import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SCIENTIFIC_DETAIL, SCIENTIFIC_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';
import { PAGE_SIZE } from '../constants';

export const useScientificList = (tableParams) => {
    var sort, sortColumn, limit, page, search;
    if (tableParams !== undefined) {
        sort = tableParams.sorter?.sort || 'desc'
        sortColumn = tableParams.sorter?.sortColumn || 'id'
        limit = tableParams.sorter?.pageSize || PAGE_SIZE
        page = tableParams.sorter?.current || 1
        search = tableParams.search
    }

    return useQuery([SCIENTIFIC_LIST, sort, sortColumn, limit, page, search], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.SCIENTIFIC.LIST}`,
            {
                params: {
                    sort: sort,
                    sortColumn: sortColumn,
                    limit: limit,
                    search,
                    offset: page == 1 ? page - 1 : page
                },
            })

        return { data, total: headers["x-total-count"] };
    })
}

export const useScientificDetail = (scientificId) => {
    return useQuery([SCIENTIFIC_DETAIL,scientificId], async () => {
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
export const useUpdateScientific = (scientificId) => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.put(`${API.API_ROOT}${API.SCIENTIFIC.UPDATE}`.replace(':id', scientificId), data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(SCIENTIFIC_LIST);
            },
        }
    );
};