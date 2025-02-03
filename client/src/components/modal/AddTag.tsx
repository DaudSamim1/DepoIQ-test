import React, { useEffect } from "react"
import { Button, Form, Input, Modal, notification } from "antd"
import { useMutation } from "@apollo/client"
import { CREATE_TAG, UPDATE_TAG } from "../../graphql/tag/tag.mutations"
import { GET_ALL_TAGS } from "../../graphql/tag/tag.queries"
import { TagType } from "../../interface"
import { logClientError, logClientMessage } from "../../utils/datadogLogger"

interface AddTagModalProps {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
  editTag?: TagType | null
}

const AddTagModal: React.FC<AddTagModalProps> = ({ isModalOpen, setIsModalOpen, editTag }) => {
  const [form] = Form.useForm()

  //  Define mutations
  const [createTag, { loading: createLoading }] = useMutation(CREATE_TAG, {
    refetchQueries: [{ query: GET_ALL_TAGS }]
  })

  const [updateTag, { loading: updateLoading }] = useMutation(UPDATE_TAG, {
    refetchQueries: [{ query: GET_ALL_TAGS }]
  })

  //  Handle form submission for create or update
  const handleSubmit = async (values: { title: string; color: string }) => {
    try {
      if (!values.title.trim() || !values.color.trim()) {
        return notification.error({ message: "Please fill out all fields" })
      }

      if (editTag) {
        await updateTag({
          variables: {
            id: editTag.id,
            input: { title: values.title.trim(), color: values.color.trim() }
          }
        })
        notification.success({ message: "Tag updated successfully!" })
        logClientMessage(`Tag with id ${editTag.id} updated`, "info", { tagId: editTag.id })
      } else {
        await createTag({
          variables: {
            input: { title: values.title.trim(), color: values.color.trim() }
          }
        })
        notification.success({ message: "Tag added successfully!" })
        logClientMessage("New tag added", "info", { title: values.title.trim() })
      }

      form.resetFields()
      setIsModalOpen(false)
    } catch (error) {
      notification.error({
        message: "Error processing tag",
        description: (error as Error).message
      })
      logClientError(error as Error, { tagTitle: values.title.trim() })
    }
  }

  //  Populate fields when editing
  useEffect(() => {
    if (editTag) {
      form.setFieldsValue({ title: editTag.title, color: editTag.color })
    } else {
      form.resetFields()
    }
  }, [editTag, form])

  return (
    <Modal
      title={editTag ? "Edit Tag" : "Add New Tag"}
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false)
        form.resetFields()
      }}
      onOk={form.submit}
      footer={null}
      confirmLoading={createLoading || updateLoading}
      destroyOnClose
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter a title" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Color" name="color" rules={[{ required: true, message: "Please enter a color" }]}>
          <Input type="color" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={createLoading || updateLoading} block>
            {editTag ? "Update" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddTagModal
