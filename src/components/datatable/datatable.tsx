import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Row, Col, Select, Pagination, Input, Spin } from 'antd';
import type { TableProps } from 'antd';
import { createStyles } from 'antd-style';
import axios from 'axios'; // For API calls

const { Option } = Select;
const { Search } = Input;

const useStyle = createStyles(({ css, token }: any) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: unset;
          }
        }
      }
    `,
  };
});

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
    fixed: 'left',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 30,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 100,
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    width: 100,
    render: (_, { tags }) => (
      <>
        {tags.map(tag => (
          <Tag color={tag.length > 5 ? 'geekblue' : 'green'} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    width: 100,
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export default function DataTable() {
  const { styles } = useStyle();
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async (page: number, size: number, search: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`, // Example API
        {
          params: {
            _page: page,
            _limit: size,
            q: search, // Server-side search
          },
        }
      );
      const items = response.data.map((item: any) => ({
        key: item.id,
        name: item.title,
        age: Math.floor(Math.random() * 50) + 20, // Random age for demo
        address: `Address ${item.id}`,
        tags: ['cool', 'developer'],
      }));
      setData(items);
      setTotalItems(parseInt(response.headers['x-total-count'], 10)); // Total items from API
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, pageSize, searchTerm);
  }, [currentPage, pageSize, searchTerm]);

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="mx-5">
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Search
            placeholder="Search by name"
            onSearch={handleSearch}
            style={{ width: 200 }}
            allowClear
          />
        </Col>
        <Col>
        
        </Col>
      </Row>

      <Table<DataType>
        // className={styles.customTable}
        virtual
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        bordered
        size="middle"
        scroll={{ x: 'auto', y: 600 }}
      />

      <Row justify="space-between" align="middle" style={{ marginTop: 16 }}>
        <Col>
          <span className='mx-5'>
            {Math.min((currentPage - 1) * pageSize + 1, totalItems)} -{' '}
            {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
          </span>
          <Select
            value={pageSize}
            onChange={value => handlePageChange(1, value)}
            style={{ width: 80 }}
          >
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={30}>30</Option>
          </Select>
        </Col>
        <Col className='mx-5'>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={handlePageChange}
            showSizeChanger={false} // Use Select for size changing
          />
        </Col>
      </Row>
    </div>
  );
}
