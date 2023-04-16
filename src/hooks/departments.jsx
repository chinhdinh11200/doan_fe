import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DEPARTMENT_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';

export const useDepartmentList = () => {
    return useQuery([DEPARTMENT_LIST], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.DEPARTMENT.LIST}`)
        const data2 = data.rows
        
        return {data: data.rows, count: data.count};
    })
}

export const useCreateDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.DEPARTMENT.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(DEPARTMENT_LIST);
            },
        }
    );
};