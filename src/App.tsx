import "./styles/App.css"
import AppRoutes from "./routes/Routes"
import { Toaster } from "sonner"

function App() {
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <AppRoutes />
    </>
  )
}

export default App
