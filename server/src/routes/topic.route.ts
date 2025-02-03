import express from "express"
import { TopicController } from "../controllers"
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node"

const router = express.Router()

// GET /api/topics
router.get("/", ClerkExpressRequireAuth(), TopicController.getAllTopics)

// GET /api/topics/:id
router.get("/:id", ClerkExpressRequireAuth(), TopicController.getTopicById)

// POST /api/topics
router.post("/", ClerkExpressRequireAuth(), TopicController.createTopic)

// POST /api/topics/:id/add-tag
router.post("/:id/add-tag", ClerkExpressRequireAuth(), TopicController.addTagToTopic)

// POST /api/topics/:id/remove-tag
router.post("/:id/remove-tag", ClerkExpressRequireAuth(), TopicController.removeTagFromTopic)

// PUT /api/topics/:id
router.put("/:id", ClerkExpressRequireAuth(), TopicController.updateTopic)

// DELETE /api/topics/:id
router.delete("/:id", ClerkExpressRequireAuth(), TopicController.deleteTopic)

export default router
