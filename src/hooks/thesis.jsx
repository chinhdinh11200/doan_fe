import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { THESIS_DETAIL, THESIS_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';

export const useThesisList = (tableParams) => {
    const { sort = "desc", sortColumn = "id" } = tableParams.sorter;
    const { pageSize: limit = PAGE_SIZE, current: page = 1 } =
        tableParams.pagination;

    return useQuery([THESIS_LIST, sort, sortColumn, limit, page], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.THESIS.LIST}`,
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

export const useThesisDetail = (thesisId) => {
    return useQuery([THESIS_DETAIL], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.THESIS.UPDATE}`.replace(':id', thesisId))

        return data;
    })
}

export const useThesisDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (thesisId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.THESIS.UPDATE.replace(":id", thesisId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(THESIS_LIST);
            },
        }
    );
};

export const useCreateThesis = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.THESIS.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(THESIS_LIST);
            },
        }
    );
};