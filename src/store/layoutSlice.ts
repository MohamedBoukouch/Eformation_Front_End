import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


// Configuration initiale du thème
const themeConfig = {
  layout: {
    menu: {
      isCollapsed: false,
    },
  },
};

// Fonction pour récupérer la valeur du localStorage
const initialSidebarCollapsed = (): boolean => {
  const item = window.localStorage.getItem("sidebarCollapsed");
  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed;
};

// Type du state
interface LayoutState {
  isCollapsed: boolean;
}

// État initial
const initialState: LayoutState = {
  isCollapsed: initialSidebarCollapsed(),
};

// Slice Redux
export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    handleSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload;
      window.localStorage.setItem(
        "sidebarCollapsed",
        JSON.stringify(action.payload)
      );
    },
  },
});

// Export des actions
export const { handleSidebarCollapsed } = layoutSlice.actions;

// Export du reducer par défaut
export default layoutSlice.reducer;
