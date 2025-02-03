import React, { useState } from "react"
import { Button, Tooltip, Tag, Modal, message } from "antd"
import { DeleteFilled, EditFilled, PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import { useQuery, useMutation } from "@apollo/client"
import DynamicTable from "../components/Table"
import AddTagModal from "../components/modal/AddTag"
import { GetTagsQuery, TagType } from "../interface"
import { GET_ALL_TAGS } from "../graphql/tag/tag.queries"
import { DELETE_TAG } from "../graphql/tag/tag.mutations"
import { useSearch } from "../hook/useSearch"
import { logClientError, logClientMessage } from "../utils/datadogLogger"

const Tags: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editTag, setEditTag] = useState<TagType | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Search value
  const { searchValue } = useSearch()

  // Fetch tags
  const { data, loading, error } = useQuery<GetTagsQuery>(GET_ALL_TAGS)

  // Delete tag mutation
  const [deleteTag, { loading: deleting }] = useMutation(DELETE_TAG, {
    refetchQueries: [{ query: GET_ALL_TAGS }]
  })

  const handleEditTag = (tag: TagType) => {
    setEditTag(tag)
    setIsModalOpen(true)
  }

  // open modal
  const handleOpenModal = () => setIsModalOpen(true)

  // Delete Confirmation Modal
  const handleDeleteTag = (id: string) => {
    Modal.confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      content: "This will permanently delete the tag.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          await deleteTag({ variables: { id } })
          message.success("Tag deleted successfully!")
          logClientMessage(`Tag with id ${id} deleted`, "info", { tagId: id })
        } catch (error) {
          message.error("Failed to delete tag.")
          logClientError(error as Error, { tagId: id })
        }
      }
    })
  }

  // Handle table change
  const handleTableChange = (pagination: { current?: number; pageSize?: number }) => {
    setCurrentPage(pagination.current || 1)
    setPageSize(pagination.pageSize || 10)
  }

  // Paginate data and filter based on search value
  const paginatedData =
    data?.getTags
      ?.filter(
        (tag) =>
          tag.title?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
          tag.color?.toLowerCase()?.includes(searchValue.toLowerCase())
      )
      ?.slice((currentPage - 1) * pageSize, currentPage * pageSize) || []

  // Table Columns
  const columns = [
    {
      width: "300px",
      title: <span className="text-gray-800">Tag Title</span>,
      dataIndex: "title",
      key: "title",
      render: (title: string) => <span className="text-gray-800">{title}</span>
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (color: string) => <Tag color={color}>{color}</Tag>
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "id",
      render: (_: any, record: TagType) => (
        <div className="flex items-center justify-center gap-2">
          <Tooltip title="Edit Tag">
            <Button type="primary" size="small" onClick={() => handleEditTag(record)}>
              <EditFilled />
            </Button>
          </Tooltip>
          <Tooltip title="Delete Tag">
            <Button type="primary" danger size="small" onClick={() => handleDeleteTag(record.id)} loading={deleting}>
              <DeleteFilled />
            </Button>
          </Tooltip>
        </div>
      )
    }
  ]

  document.title = "Tag Management | GraphQL CMS" // Page Title

  return (
    <div className="max-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-auto">
      <div className="flex flex-col gap-3 w-full max-w-3xl mx-auto relative py-1 md:py-4 lg:py-8">
        <h1 className="text-xl font-bold mb-4">Tag Management</h1>

        {/* Add New Tag Button */}
        <Tooltip title="Add a new tag">
          <Button type="primary" onClick={() => handleOpenModal()} className="absolute top-0 right-2 p-2">
            <span className="hidden md:inline-block">Add New</span> <PlusOutlined className="-ml-2" />
          </Button>
        </Tooltip>

        {/*  Ensure pagination works */}
        <DynamicTable
          columns={columns}
          data={paginatedData}
          loading={loading}
          error={error}
          currentPage={currentPage}
          pageSize={pageSize}
          totalRecords={data?.getTags?.length || 0}
          onTableChange={handleTableChange}
        />

        {/* Modal for Adding/Editing Tag */}
        <AddTagModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} editTag={editTag} />
      </div>
    </div>
  )
}

export default Tags
