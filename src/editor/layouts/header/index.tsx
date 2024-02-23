import React from "react";
import { Button } from "antd";
import { useComponets } from "../../stores/components";

export default function Header() {
  const { mode, setMode, setCurComponentId } = useComponets();
  return (
    <div className=" w-full h-full">
      {mode === "edit" && (
        <Button
          onClick={() => {
            setMode("preview");
            setCurComponentId(null);
          }}
          type="primary"
        >
          预览
        </Button>
      )}
      {mode === "preview" && (
        <Button
          onClick={() => {
            setMode("edit");
          }}
          type="primary"
        >
          退出预览
        </Button>
      )}
    </div>
  );
}
