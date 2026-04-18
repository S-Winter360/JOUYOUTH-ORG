/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Conference from "./pages/Conference";
import Volunteer from "./pages/Volunteer";
import About from "./pages/About";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/conference" element={<Conference />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
