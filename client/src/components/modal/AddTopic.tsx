import React, { useEffect } from "react"
import { Button, Form, Input, Modal, notification, Select } from "antd"
import { useMutation, useQuery } from "@apollo/client"
import TextArea from "antd/es/input/TextArea"
import { GetTagsQuery, Topic } from "../../interface"
import { CREATE_TOPIC, UPDATE_TOPIC } from "../../graphql/topic/topic.mutations"
import { GET_ALL_TOPICS } from "../../graphql/topic/topic.queries"
import { GET_ALL_TAGS } from "../../graphql/tag/tag.queries"
import { logClientError, logClientMessage } from "../../utils/datadogLogger"

interface AddTopicModalProps {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
  editTopic?: Topic | null
  refetch?: () => void
}

const AddTopicModal: React.FC<AddTopicModalProps> = ({ isModalOpen, setIsModalOpen, editTopic, refetch }) => {
  const [form] = Form.useForm()

  // Fetch available tags
  const { data: tagsData, loading: tagsLoading } = useQuery<GetTagsQuery>(GET_ALL_TAGS)

  // Define mutations
  const [createTopic, { loading: createLoading }] = useMutation(CREATE_TOPIC, {
    refetchQueries: [{ query: GET_ALL_TOPICS }]
  })

  const [updateTopic, { loading: updateLoading }] = useMutation(UPDATE_TOPIC, {
    refetchQueries: [{ query: GET_ALL_TOPICS }]
  })

  // Handle form submission for create or update
  const handleSubmit = async (values: { title: string; tags: string[]; content: string }) => {
    try {
      if (!values.title.trim() || values?.tags?.length === 0 || !values.content.trim()) {
        return notification.error({ message: "Please fill out all fields" })
      }

      if (editTopic) {
        await updateTopic({
          variables: {
            id: editTopic.id,
            input: {
              title: values.title.trim(),
              content: values.content.trim(),
              tags: values?.tags || []
            }
          }
        })
        refetch?.()
        notification.success({ message: "Topic updated successfully!" })
        logClientMessage(`Topic with id ${editTopic.id} updated`, "info", { topicId: editTopic.id })
      } else {
        await createTopic({
          variables: {
            input: {
              title: values.title.trim(),
              content: values.content.trim(),
              tags: values?.tags || []
            }
          }
        })
        notification.success({ message: "Topic added successfully!" })
        logClientMessage(`New topic added with title ${values.title.trim()}`, "info", { title: values.title.trim() })
      }

      form.resetFields()
      setIsModalOpen(false)
    } catch (error) {
      notification.error({
        message: "Error processing topic",
        description: (error as Error).message
      })
      logClientError(error as Error, { topicTitle: values.title.trim() })
    }
  }

  // Populate fields when editing
  useEffect(() => {
    if (editTopic) {
      form.setFieldsValue({
        title: editTopic.title,
        content: editTopic.content,
        tags: editTopic.tags.map((tag) => tag.id)
      })
    } else {
      form?.resetFields()
    }
  }, [editTopic, form])

  // Extract available tags for the dropdown with color logic
  const tagOptions =
    tagsData?.getTags.map((tag: { id: string; title: string; color: string }) => ({
      label: tag.title,
      value: tag.id,
      color: tag.color
    })) || []

  return (
    <Modal
      title={editTopic ? "Edit Topic" : "Add New Topic"}
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false)
        form.resetFields()
      }}
      onOk={form.submit}
      confirmLoading={createLoading || updateLoading}
      destroyOnClose
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter a title" }]}>
          <Input maxLength={30} />
        </Form.Item>

        <Form.Item label="Tags" name="tags" rules={[{ required: true, message: "Please select tag from list" }]}>
          <Select mode="multiple" allowClear placeholder="Select tags" disabled={tagsLoading} loading={tagsLoading}>
            {tagOptions.map((tag) => (
              <Select.Option key={tag.value} value={tag.value}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* Display a small colored circle for each tag */}
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      backgroundColor: tag.color,
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: 8
                    }}
                  />
                  {tag.label}
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Description" name="content">
          <TextArea rows={5} maxLength={1000} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={createLoading || updateLoading} block>
            {editTopic ? "Update" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddTopicModal
