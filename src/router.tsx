import { Routes, Route } from 'react-router-dom';
import { Layout } from "@/components";
import {Home} from "@/pages/home";
import {List} from "@/pages/list";

export function Router (){
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
      </Route>
    </Routes>
  )
}
