import { createRouter, createWebHistory } from "vue-router";

// Import your pages/components
// Home component is located under components in this project
import Home from "@/components/Home.vue";
import AddJob from "@/components/AddJob.vue";
import EditJob from "@/components/EditJob.vue";
import JobView from "@/components/JobView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/addJob",
    name: "AddJob",
    component: AddJob,
  },
  {
    path: "/editJob/:id",
    name: "EditJob",
    component: EditJob,
    props: true,
  },
  {
    path: "/job/:id",
    name: "Job",
    component: JobView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
