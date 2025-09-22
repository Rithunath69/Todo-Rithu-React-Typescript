import { BrowserRouter, Routes, Route } from "react-router-dom"
import TodoApp from "./todo";
import Popup from "./popup";
export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoApp />} />
        <Route path="/popup" element={<Popup />} />
        {/* or if you want path with param: <Route path="/popup/:id" element={<Popup />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
