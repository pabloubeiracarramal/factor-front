import { Input, DatePicker, InputNumber, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { InvoiceQueryParams } from '../../../types';

const { RangePicker } = DatePicker;

type FilterChangeHandler = (key: keyof InvoiceQueryParams, value: any) => void;

export const createTextFilter = (
  key: keyof InvoiceQueryParams,
  placeholder: string,
  filters: InvoiceQueryParams,
  handleFilterChange: FilterChangeHandler
) => ({
  filterDropdown: () => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={placeholder}
        value={filters[key] as string}
        onChange={(e) => handleFilterChange(key, e.target.value)}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
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
  filters: InvoiceQueryParams,
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
        style={{ marginBottom: 8 }}
      />
    </div>
  ),
  filtered: !!filters.dateFrom || !!filters.dateTo,
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
});

export const createPriceRangeFilter = (
  filters: InvoiceQueryParams,
  handleFilterChange: FilterChangeHandler,
  minPricePlaceholder: string,
  maxPricePlaceholder: string
) => ({
  filterDropdown: () => (
    <div style={{ padding: 8 }}>
      <div style={{ marginBottom: 8 }}>
        <InputNumber
          placeholder={minPricePlaceholder}
          value={filters.priceMin}
          onChange={(value) => handleFilterChange('priceMin', value)}
          style={{ width: '100%' }}
          prefix="$"
          min={0}
        />
      </div>
      <div>
        <InputNumber
          placeholder={maxPricePlaceholder}
          value={filters.priceMax}
          onChange={(value) => handleFilterChange('priceMax', value)}
          style={{ width: '100%' }}
          prefix="$"
          min={0}
        />
      </div>
    </div>
  ),
  filtered: !!filters.priceMin || !!filters.priceMax,
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
});

export const createStatusFilter = (
  filters: InvoiceQueryParams,
  handleFilterChange: FilterChangeHandler,
  placeholder: string,
  statusOptions: Array<{ label: string; value: string }>
) => ({
  filterDropdown: () => (
    <div style={{ padding: 8 }}>
      <Select
        placeholder={placeholder}
        value={filters.status}
        onChange={(value) => handleFilterChange('status', value)}
        style={{ width: 188 }}
        allowClear
        options={statusOptions}
      />
    </div>
  ),
  filtered: !!filters.status,
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
});

export const createClientFilter = (
  filters: InvoiceQueryParams,
  handleFilterChange: FilterChangeHandler,
  placeholder: string,
  clientOptions: Array<{ label: string; value: string }>
) => ({
  filterDropdown: () => (
    <div style={{ padding: 8 }}>
      <Select
        placeholder={placeholder}
        value={filters.clientId}
        onChange={(value) => handleFilterChange('clientId', value)}
        style={{ width: 188 }}
        allowClear
        showSearch
        optionFilterProp="label"
        options={clientOptions}
      />
    </div>
  ),
  filtered: !!filters.clientId,
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
});
