import express from "express"
import { TagController } from "../controllers"
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node"

const router = express.Router()

// GET /api/tag
router.get("/", ClerkExpressRequireAuth(), TagController.getAllTags)

// GET /api/tag/:id
router.get("/:id", ClerkExpressRequireAuth(), TagController.getTagById)

// POST /api/tag
router.post("/", ClerkExpressRequireAuth(), TagController.createTag)

// PUT /api/tag/:id
router.put("/:id", ClerkExpressRequireAuth(), TagController.updateTag)

// DELETE /api/tag/:id
router.delete("/:id", ClerkExpressRequireAuth(), TagController.deleteTag)

export default router
