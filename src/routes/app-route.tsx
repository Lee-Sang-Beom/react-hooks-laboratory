import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => ({
      Component: (await import("@/pages/home-page.tsx")).default,
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
  {
    path: "/use-use",
    lazy: async () => ({
      Component: (await import("@/pages/use/use-page.tsx")).default,
    }),
  },
  {
    path: "/use-deferred-value",
    lazy: async () => ({
      Component: (
        await import("@/pages/deferred-value/deferred-value-page.tsx")
      ).default,
    }),
  },
]);

export default router;
