import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EDUCATION_DETAIL, EDUCATION_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';

export const useEducationList = (tableParams) => {
    const { sort = "desc", sortColumn = "id" } = tableParams.sorter;
    const { pageSize: limit = PAGE_SIZE, current: page = 1 } =
        tableParams.pagination;

    return useQuery([EDUCATION_LIST, sort, sortColumn, limit, page], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.EDUCATION.LIST}`,
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

export const useEducationDetail = (educationId) => {
    return useQuery([EDUCATION_DETAIL], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.EDUCATION.UPDATE}`.replace(':id', educationId))

        return data;
    })
}

export const useEducationDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (educationId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.EDUCATION.UPDATE.replace(":id", educationId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(EDUCATION_LIST);
            },
        }
    );
};

export const useCreateEducation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.EDUCATION.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(EDUCATION_LIST);
            },
        }
    );
};