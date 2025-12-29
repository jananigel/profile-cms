# Dashboard Selector Warning

## 問題 Issue
- zh-TW: 在 `Dashboard.page.tsx` 新增卡片元件後，React Redux 顯示「Selector unknown returned a different result when called with the same parameters」，代表選取器回傳的資料每次都被視為不同，造成不必要的重新渲染。
- en: After adding new cards in `Dashboard.page.tsx`, React Redux raised "Selector unknown returned a different result when called with the same parameters", meaning the selector output changed identity between renders and triggered needless rerenders.

## 根本原因 Root Cause
- zh-TW: 每個 `useSelector` 都直接宣告匿名函式並回傳新物件／陣列，Redux 追蹤不到這些選取器，因此只要任意 render 便會得到新的參考，導致 React 認為 selector 改變。
- en: Each `useSelector` call used inline functions that built new objects/arrays on every render. Redux could not memoize these anonymous selectors, so even unchanged state produced new references and React flagged them as unknown selectors with differing results.

## 解決方法 Fix
- zh-TW: 使用 RTK 的 `createSelector` 將儀表板相關資料（統計卡、完整度、個人摘要、年資）集中在 `dashboard.selector.ts`，並在元件中直接引用這些 memoized selectors，如此在 state 未變更時會維持相同參考，警告也消失。
- en: Memoized all dashboard-related selectors (stats, completeness, profile snapshot, experience summary) via RTK's `createSelector` in `dashboard.selector.ts`, then wired components to consume those shared selectors. When state is unchanged, the selector outputs keep the same references and the warning goes away.
