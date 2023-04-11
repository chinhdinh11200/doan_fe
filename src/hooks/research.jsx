import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TOPIC_DETAIL, TOPIC_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';

export const useTopicList = (tableParams) => {
    const { sort = "desc", sortColumn = "id" } = tableParams.sorter;
    const { pageSize: limit = PAGE_SIZE, current: page = 1 } =
        tableParams.pagination;

    return useQuery([TOPIC_LIST, sort, sortColumn, limit, page], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.TOPIC.LIST}`,
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

export const useTopicDetail = (topicId) => {
    return useQuery([TOPIC_DETAIL], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.TOPIC.UPDATE}`.replace(':id', topicId))

        return data;
    })
}

export const useTopicDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (topicId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.TOPIC.UPDATE.replace(":id", topicId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(TOPIC_LIST);
            },
        }
    );
};

export const useCreateTopic= () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.TOPIC.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(TOPIC_LIST);
            },
        }
    );
};