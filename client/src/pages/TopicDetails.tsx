import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client"
import { GET_TOPIC_BY_ID } from "../graphql/topic/topic.queries"
import { DELETE_TOPIC } from "../graphql/topic/topic.mutations"
import { Alert, Button, Empty, Modal, Spin, Tag, Tooltip, Typography, message } from "antd"
import { DeleteFilled, EditFilled, ExclamationCircleOutlined } from "@ant-design/icons"
import { useSearch } from "../hook/useSearch"
import { highlightText } from "../utils/highlightText"
import AddTopicModal from "../components/modal/AddTopic"
import { ROUTES_ENDPOINTS } from "../contants/routes_endpoints"

const { Title, Paragraph } = Typography

const TopicDetails = () => {
  const { id } = useParams<{ id: string }>() // Get topic ID from URL
  const navigate = useNavigate()
  const { searchValue } = useSearch()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch Topic by ID
  const { data, loading, error, refetch } = useQuery(GET_TOPIC_BY_ID, {
    variables: { id },
    skip: !id
  })

  // Delete Topic Mutation
  const [deleteTopic] = useMutation(DELETE_TOPIC, {
    onCompleted: () => {
      message.success("Topic deleted successfully!")
      navigate(ROUTES_ENDPOINTS.DASHBOARD) // Redirect to topics page
    },
    onError: (err) => message.error(err.message)
  })

  // If loading topic
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    )
  }

  // If error fetching topic
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert message="Error fetching topic details" description={error.message} type="error" showIcon />
      </div>
    )
  }

  // If no topic found
  if (!data?.getTopic) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Empty description="No Topic Found" />
      </div>
    )
  }

  const { title, content, tags } = data.getTopic // Destructure topic data

  // Delete Topic Handler
  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      content: "This will permanently delete the topic.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        await deleteTopic({ variables: { id } })
      }
    })
  }

  document.title = `${title} - Depo IQ | GraphQL CMS` // Set page title

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-5 md:mt-5 lg:mt-10">
      {/* add a back button */}

      <Tooltip title="Back to Topics">
        <Button
          type="primary"
          onClick={() => navigate(ROUTES_ENDPOINTS.DASHBOARD)}
          size={"small"}
          className="absolute top-1 left-2 text-xs md:text-md"
        >
          Back to Topics
        </Button>
      </Tooltip>

      <div className="flex justify-between items-center md:relative">
        <Title level={2} className="text-gray-800">
          <span dangerouslySetInnerHTML={{ __html: highlightText(title, searchValue) }} />
        </Title>
        <div className="flex gap-2 absolute top-2 right-2">
          <Tooltip title="Edit Topic">
            <Button type="primary" icon={<EditFilled />} onClick={() => setIsModalOpen(true)} />
          </Tooltip>
          <Tooltip title="Delete Topic">
            <Button type="primary" danger icon={<DeleteFilled size={20} />} onClick={handleDelete} />
          </Tooltip>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 my-4">
        {tags.map((tag: { id: string; title: string; color: string }) => (
          <Tag key={tag.id} color={tag.color}>
            {tag.title}
          </Tag>
        ))}
      </div>

      <Paragraph className="text-gray-700 text-lg leading-relaxed">
        <span dangerouslySetInnerHTML={{ __html: highlightText(content, searchValue) }} />
      </Paragraph>

      {/* Edit Modal */}
      <AddTopicModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editTopic={data.getTopic}
        refetch={refetch}
      />
    </div>
  )
}

export default TopicDetails
