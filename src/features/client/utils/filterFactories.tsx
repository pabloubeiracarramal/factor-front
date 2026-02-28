import { Input, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { ClientQueryParams } from '../../../types';

const { RangePicker } = DatePicker;

type FilterChangeHandler = (key: keyof ClientQueryParams, value: any) => void;

export const createTextFilter = (
  key: keyof ClientQueryParams,
  placeholder: string,
  filters: ClientQueryParams,
  handleFilterChange: FilterChangeHandler
) => ({
  filterDropdown: () => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={placeholder}
        value={filters[key]}
        onChange={(e) => handleFilterChange(key, e.target.value)}
        style={{ width: 188 }}
        prefix={<SearchOutlined />}
      />
    </div>
  ),
  filtered: !!filters[key],
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
});

export const createDateRangeFilter = (
  filters: ClientQueryParams,
  handleFilterChange: FilterChangeHandler
) => ({
  filterDropdown: () => (
    <div style={{ padding: 8 }}>
      <RangePicker
        value={filters.dateFrom && filters.dateTo ? [dayjs(filters.dateFrom), dayjs(filters.dateTo)] : null}
        onChange={(dates) => {
          if (dates && dates[0] && dates[1]) {
            handleFilterChange('dateFrom', dates[0].format('YYYY-MM-DD'));
            handleFilterChange('dateTo', dates[1].format('YYYY-MM-DD'));
          } else {
            handleFilterChange('dateFrom', null);
            handleFilterChange('dateTo', null);
          }
        }}
      />
    </div>
  ),
  filtered: !!filters.dateFrom || !!filters.dateTo,
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
});
