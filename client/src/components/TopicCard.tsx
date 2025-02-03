import React from "react"
import { Button, message, Modal, Tooltip } from "antd"
import { DeleteFilled, EditFilled, ExclamationCircleOutlined } from "@ant-design/icons"

import { highlightText } from "../utils/highlightText"
import { useNavigate } from "react-router-dom"
import { ROUTES_ENDPOINTS } from "../contants/routes_endpoints"
import { Topic } from "../interface"
import { DELETE_TOPIC } from "../graphql/topic/topic.mutations"
import { useMutation } from "@apollo/client"
import { useSearch } from "../hook/useSearch"
import { logClientError, logClientMessage } from "../utils/datadogLogger"

interface TopicCardProps {
  topic: Topic
  refetch: () => void
  handleOpenModal: (key: Topic) => void
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, handleOpenModal, refetch }) => {
  const navigate = useNavigate()
  const { searchValue } = useSearch()

  // Delete mutation
  const [deleteTopic] = useMutation(DELETE_TOPIC, {
    onCompleted: () => refetch(),
    onError: (error) => alert(error.message)
  })

  // Delete Confirmation Modal
  const handleDeleteTopic = (id: string) => {
    Modal.confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      content: "This will permanently delete the topic.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          await deleteTopic({ variables: { id } })
          navigate(ROUTES_ENDPOINTS.DASHBOARD)
          message.success("Topic deleted successfully!")
          logClientMessage(`Topic with id ${id} deleted`, "info", { topicId: id })
        } catch (error) {
          message.error("Failed to delete topic.")
          logClientError(error as Error, { topicId: id })
        }
      }
    })
  }

  // Open Modal for Editing
  const handleClickTopic = (id: string) => navigate(ROUTES_ENDPOINTS.TOPICS_DETAIL.replace(":id", id))
  return (
    <Tooltip title={topic.title}>
      <div
        className="p-2 md:p-4 rounded-lg shadow border border-gray-100 bg-white bg-opacity-75 text-gray-800 md:m-2 hover:bg-gray-200 hover:shadow-md hover:-translate-y-2 transition-all duration-400 relative group cursor-pointer"
        onClick={() => handleClickTopic(topic.id)}
      >
        <h2
          className="text-md md:text-lg font-bold mb-2"
          dangerouslySetInnerHTML={{ __html: highlightText(topic.title, searchValue) }}
        />
        <div className="tags my-1.5 md:my-3 flex justify-end absolute top-4 right-0">
          {topic.tags.map((tag) => (
            <span
              key={"tag--" + tag.id}
              className="hover:bg-blue-700 text-white rounded-full text-[10px] p-1 px-1.5 mr-2"
              style={{ backgroundColor: tag.color }}
            >
              {tag.title}
            </span>
          ))}
        </div>
        <div className="flex gap-2 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition duration-300">
          {/* Edit Button */}
          <Tooltip title="Delete Topic">
            <Button
              type="primary"
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                handleOpenModal(topic)
              }}
            >
              <EditFilled />
            </Button>
          </Tooltip>

          {/* Delete Button */}
          <Tooltip title="Delete Topic">
            <Button
              type="primary"
              size="small"
              danger
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteTopic(topic.id)
              }}
            >
              <DeleteFilled />
            </Button>
          </Tooltip>
        </div>
        <p
          className="text-sm md:text-md"
          dangerouslySetInnerHTML={{ __html: highlightText(topic.content, searchValue) }}
        />
      </div>
    </Tooltip>
  )
}

export default TopicCard
