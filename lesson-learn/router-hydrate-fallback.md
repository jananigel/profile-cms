# No HydrateFallback Warning

## 問題 Issue
- zh-TW: 在 `App.tsx` 中使用 `<RouterProvider>` 後，瀏覽器顯示 `No HydrateFallback element provided to render during initial hydration` 的警告，提示初始載入階段缺少後援畫面。
- en: When mounting `<RouterProvider>` in `App.tsx`, the browser logged `No HydrateFallback element provided to render during initial hydration`, warning that the router had no fallback UI while initial modules were loading.

## 根本原因 Root Cause
- zh-TW: React Router v7 移除了 `<RouterProvider fallbackElement>`，改要求在所有以 `lazy` 載入的根路由提供 `hydrateFallbackElement` 或 `HydrateFallback`。我們的 `createHashRouter` 每個路由都是 `lazy` 動態 import，但根路由 `login` 與 `MainLayout` 都沒有設定 fallback，導致初始 hydration 找不到可顯示的佔位元件。
- en: React Router v7 dropped the `<RouterProvider fallbackElement>` prop and now expects each root route that uses `lazy` modules to declare a `hydrateFallbackElement`/`HydrateFallback`. Our `createHashRouter` defines root-level `login` and `MainLayout` routes that both lazy-load their components without any fallback element, so initial hydration had nothing to render while those chunks resolved.

## 解決方法 Fix
- zh-TW: 建立共用的 `RouteHydrateFallback` 元件並在 `App.routes.ts` 中把 `HydrateFallback: RouteHydrateFallback` 指定給兩個根路由，確保初次渲染時有穩定的佔位畫面，警告隨即消失。
- en: Created a reusable `RouteHydrateFallback` component and assigned it via `HydrateFallback` on the two root routes inside `App.routes.ts`, giving React Router a fallback UI during the initial lazy-load so the warning no longer appears.
