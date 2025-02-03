import React, { useEffect, useState } from "react"
import { Alert, Button, Empty, Tooltip } from "antd"
import { Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons"
import { useQuery } from "@apollo/client"
import AddTopicModal from "../components/modal/AddTopic"
import { GetTopicsQuery, Topic } from "../interface"
import { GET_ALL_TOPICS } from "../graphql/topic/topic.queries"
import { useSearch } from "../hook/useSearch"
import TopicCard from "../components/TopicCard"

const Topics: React.FC = () => {
  const { searchValue } = useSearch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)

  // Fetch topics data
  const { data, loading, error, refetch } = useQuery<GetTopicsQuery>(GET_ALL_TOPICS)

  useEffect(() => {
    refetch() // Refetch topics on mount
  }, [])

  // Open Modal for Adding or Editing
  const handleOpenModal = (topic?: Topic) => {
    setSelectedTopic(topic || null)
    setIsModalOpen(true)
  }

  // Filter Topics based on search value
  const filterTopics = data?.getTopics?.filter(
    (topic_f) =>
      topic_f.title?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
      topic_f.content?.toLowerCase()?.includes(searchValue.toLowerCase())
  )

  // Set Page Title
  document.title = "Topics Management | GraphQL CMS"

  return (
    <div className="max-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-auto">
      <div className="flex flex-col gap-3 w-full max-w-3xl mx-auto relative py-1 md:py-4 lg:py-8">
        <h1 className="text-xl font-bold mb-4">Topics Management</h1>

        {error ? (
          <Alert message="Error Occurred" description={error.message} type="error" showIcon />
        ) : (
          <>
            {/* Add New Topic Button */}
            <Tooltip title="Add New Topic">
              <Button type="primary" onClick={() => handleOpenModal()} className="absolute top-0 right-2 p-2 ">
                <span className="hidden md:inline-block">Add New</span> <PlusOutlined className="-ml-2" />
              </Button>
            </Tooltip>

            <div className="flex flex-col gap-3 max-h-[calc(100vh-290px)] overflow-auto">
              {loading ? (
                <Loading3QuartersOutlined spin className="text-4xl text-center block my-8" />
              ) : filterTopics?.length ? (
                filterTopics?.map((topic) => (
                  <TopicCard
                    key={"topic--" + topic.id}
                    topic={topic}
                    handleOpenModal={handleOpenModal}
                    refetch={refetch}
                  />
                ))
              ) : (
                <div className="flex justify-center items-center h-64">
                  <Empty description="No Topics Found" />
                </div>
              )}
            </div>
          </>
        )}

        {/* Modal for Adding or Editing Topic */}
        <AddTopicModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} editTopic={selectedTopic} />
      </div>
    </div>
  )
}

export default Topics
