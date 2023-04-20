import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ARTICLE_DETAIL, ARTICLE_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';

export const useArticleList = (tableParams) => {
    const { sort = "desc", sortColumn = "id" } = tableParams.sorter;
    const { pageSize: limit = PAGE_SIZE, current: page = 1 } =
        tableParams.pagination;

    return useQuery([ARTICLE_LIST, sort, sortColumn, limit, page], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.ARTICLE.LIST}`,
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

export const useArticleDetail = (ArticleId) => {
    return useQuery([ARTICLE_DETAIL], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.ARTICLE.UPDATE}`.replace(':id', ArticleId))

        return data;
    })
}

export const useArticleDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (ArticleId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.ARTICLE.UPDATE.replace(":id", ArticleId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(ARTICLE_LIST);
            },
        }
    );
};

export const useCreateArticle = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.ARTICLE.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(ARTICLE_LIST);
            },
        }
    );
};

export const useUpdateArticle = (ArticleId) => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.put(`${API.API_ROOT}${API.ARTICLE.UPDATE}`.replace(':id', ArticleId), data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(ARTICLE_LIST);
            },
        }
    );
};