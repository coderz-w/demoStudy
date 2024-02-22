import React from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Header from "./header";
import Material from "./material";
import Renderer from "./renderer";
import Setting from "./setting";

export default function Layout() {
  return (
    <div className=" flex flex-col h-[100vh] w-full overflow-hidden gap-0">
      <div className=" w-full h-12 bg-red-50">
        <Header />
      </div>
      <div className=" flex flex-row gap-x-0 w-full flex-1 ">
        <Allotment>
          <Allotment.Pane preferredSize={200} maxSize={400} minSize={200}>
            <div className=" flex py-4 px-4">
              <Material />
            </div>
          </Allotment.Pane>
          <div className=" flex h-full">
            <Renderer />
          </div>
          <Allotment.Pane preferredSize={300} maxSize={500} minSize={250}>
            <div className=" flex h-full">
              <Setting />
            </div>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  );
}
