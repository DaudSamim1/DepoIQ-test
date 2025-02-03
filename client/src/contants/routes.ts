import React from "react"
import { ROUTES_ENDPOINTS } from "./routes_endpoints"
const Tags = React.lazy(() => import("../pages/Tags"))

const Topics = React.lazy(() => import("../pages/Topics"))
const TopicDetails = React.lazy(() => import("../pages/TopicDetails"))
const SignIn = React.lazy(() => import("../pages/SignIn"))

export const PRIVATE_ROUTES = [
  {
    to: ROUTES_ENDPOINTS.DASHBOARD,
    component: Topics,
    isLayout: true
  },
  {
    to: ROUTES_ENDPOINTS.TOPICS_DETAIL,
    component: TopicDetails,
    isLayout: true
  },
  {
    to: ROUTES_ENDPOINTS.TAGS,
    component: Tags,
    isLayout: true
  }
]

export const PUBLIC_ROUTES = [
  {
    to: ROUTES_ENDPOINTS.DASHBOARD,
    component: SignIn
  }
]
