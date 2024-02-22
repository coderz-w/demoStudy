// src/editor/components/space/index.tsx
import { Space as AntdSpace } from "antd";
import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import { ItemType } from "../../item-type";

interface Props {
  // 当前组件的子节点
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  // 当前组件的id
  id: number;
}

const Space: React.FC<Props> = ({children,id}) => {
  useEffect(()=>{
console.log(id)
  },[])
  const [{ canDrop }, drop] = useDrop(() => ({
    accept: [ItemType.Space, ItemType.Button],
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }

      // 这里把当前组件的id返回出去，在拖拽结束事件里可以拿到这个id。
      return {
        id,
      };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  if (!children?.length) {
    return (
      <AntdSpace
        ref={drop}
        className="p-[16px]"
        style={{ border: canDrop ? "1px solid #ccc" : "none" }}
      >
        暂无内容
      </AntdSpace>
    );
  }

  return (
    <AntdSpace
      ref={drop}
      className="p-[16px]"
      style={{ border: canDrop ? "1px solid #ccc" : "none" }}
    >
      {children}
    </AntdSpace>
  );
};

export default Space;
