import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { STAFF_DETAIL, STAFF_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';

export const useStaffList = (tableParams) => {
    const { sort = "desc", sortColumn = "id" } = tableParams.sorter;
    const { pageSize: limit = PAGE_SIZE, current: page = 1 } =
        tableParams.pagination;

    return useQuery([STAFF_LIST, sort, sortColumn, limit, page], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.STAFF.LIST}`,
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

export const useStaffDetail = (staffId) => {
    return useQuery([STAFF_DETAIL], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.STAFF.UPDATE}`.replace(':id', staffId))

        return data;
    })
}

export const useStaffDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (staffId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.STAFF.UPDATE.replace(":id", staffId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(STAFF_LIST);
            },
        }
    );
};

export const useCreateStaff = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.STAFF.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(STAFF_LIST);
            },
        }
    );
};