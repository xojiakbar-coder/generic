import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import sidebar from "../utils/sidebar";
import Navbar from "../components/Navbar/Navbar";

const Root: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route element={<Sidebar />}>
            {sidebar.map((value) => {
              if (value.children?.length) {
                return value.children.map((child) => {
                  const ChildElement = child.element;
                  return (
                    <Route
                      key={child.id}
                      path={child.path}
                      element={
                        ChildElement ? <ChildElement /> : <div>No Element</div>
                      }
                    />
                  );
                });
              } else {
                const Element = value.element;
                return (
                  !value.hidden && (
                    <Route
                      key={value.id}
                      path={value.path}
                      element={Element ? <Element /> : <div>No Element</div>}
                    />
                  )
                );
              }
            })}
          </Route>

          {sidebar.map((value) => {
            const Element = value.element;
            return (
              value.hidden && (
                <Route
                  key={value.id}
                  path={value.path}
                  element={Element ? <Element /> : <div>No Element</div>}
                />
              )
            );
          })}
        </Route>

        <Route path="/" element={<Navigate to="/components/overview" />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;