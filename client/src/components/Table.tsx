import React from "react"
import { Table, Alert } from "antd"
import SpinLoader from "./SpinLoader"
import { logClientError } from "../utils/datadogLogger"

export interface TableProps {
  columns: any[]
  data: any[]
  loading: boolean
  error?: Error | null
  currentPage: number
  pageSize: number
  totalRecords?: number
  onTableChange: (pagination: { current?: number; pageSize?: number }) => void
}

const DynamicTable: React.FC<TableProps> = ({
  columns,
  data,
  loading,
  error,
  currentPage,
  pageSize,
  totalRecords,
  onTableChange
}) => {
  if (loading) return <SpinLoader />
  if (error) {
    logClientError(error as Error, { component: "DynamicTable" })
    return <Alert message="Error" description={error.message} type="error" showIcon />
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: totalRecords,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"]
      }}
      onChange={onTableChange}
      className="overflow-x-scroll sm:overflow-x-hidden"
      bordered
    />
  )
}

export default DynamicTable
