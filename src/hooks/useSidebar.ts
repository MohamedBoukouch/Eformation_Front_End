// // useSidebar.ts
// import { useSelector, useDispatch } from "react-redux";
// import type { RootState } from "../store/store";
// import { handleSidebarCollapsed } from "../store/layoutSlice";


// const useSidebar = (): [boolean, (val: boolean) => void] => {
//   const dispatch = useDispatch();
//   const collapsed = useSelector((state: RootState) => state.layout.isCollapsed);

//   const setMenuCollapsed = (val: boolean) => dispatch(handleSidebarCollapsed(val));

//   return [collapsed, setMenuCollapsed];
// };

// export default useSidebar;
