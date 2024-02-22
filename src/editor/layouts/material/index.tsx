/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import DragProvider from "../../common/dragProvider";
import { ItemType } from "../../item-type";
import { useComponets } from "../../stores/components";

export default function Material() {
  const { addComponent } = useComponets();
  const onDragEnd = (dropResult: any) => {
    if (dropResult.id) {
      addComponent(
        {
          id: new Date().getTime(),
          name: dropResult.name,
          props: dropResult.props,
        },
        dropResult.id
      );
    } else {
      addComponent({
        id: new Date().getTime(),
        name: dropResult.name,
        props: dropResult.props,
      });
    }
    console.log(
      {
        id: new Date().getTime(),
        name: dropResult.name,
        props: dropResult.props,
      },
      dropResult
    );
  };

  return (
    <div className=" w-full flex flex-row flex-wrap gap-4">
      <DragProvider
        onDragEnd={onDragEnd}
        description="按钮"
        name={ItemType.Button}
      />
      <DragProvider
        onDragEnd={onDragEnd}
        description="间距"
        name={ItemType.Space}
      />
    </div>
  );
}
