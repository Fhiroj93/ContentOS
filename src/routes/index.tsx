import { createFileRoute } from "@tanstack/react-router";
import App from "@/dashboard/App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ContentOS — SaaS Content Dashboard" },
      { name: "description", content: "Plan, approve, schedule and analyze SaaS content across LinkedIn, X and your blog." },
      { property: "og:title", content: "ContentOS — SaaS Content Dashboard" },
      { property: "og:description", content: "Plan, approve, schedule and analyze SaaS content across LinkedIn, X and your blog." },
    ],
  }),
  component: App,
});
