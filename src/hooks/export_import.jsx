import { EXAM_LIST, EXPORT_FILE } from "../constants/QueryKey";
import API from '../constants/api';
export const useExportFile = (userId) => {

  return useQuery([EXPORT_FILE], async () => {
      const { data, headers } = await axios.get(
          `${API.API_ROOT}${API.FILE.EXPORT}`.replace(':id', userId),
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