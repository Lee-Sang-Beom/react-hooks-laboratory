import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => ({
      Component: (await import("@/pages/home-page")).default,
    }),
  },
  {
    path: "/use-optimistic",
    lazy: async () => ({
      Component: (await import("@/pages/optimistic/optimistic-page.tsx"))
        .default,
    }),
  },
  {
    path: "/use-transition",
    lazy: async () => ({
      Component: (await import("@/pages/transition/transition-page.tsx"))
        .default,
    }),
  },
]);

export default router;
