/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import Space from "../../components/space";
import React from "react";
import { ItemType } from "../../item-type";
import { useDrop } from "react-dnd";
import { useComponets } from "../../stores/components";
const ComponentMap: { [key: string]: any } = {
  Button: Button,
  Space: Space,
};

interface Component {
  /**
   * 组件唯一标识
   */
  id: number;
  /**
   * 组件名称
   */
  name: string;
  /**
   * 组件属性
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any;
  /**
   * 子组件
   */
  children?: Component[];
}
const Stage: React.FC = () => {
  const { components } = useComponets();
  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      if (!ComponentMap[component.name]) {
        return null;
      }

      if (ComponentMap[component.name]) {
        return React.createElement(
          ComponentMap[component.name],
          {
            id: component.id,
            key: component.id,
            "data-component-id": component.id,
            ...component.props,
          },
          component.props.children || renderComponents(component.children || [])
        );
      }
    });
  }

  const [{ canDrop }, drop] = useDrop(() => ({
    // 可以接受的元素类型
    accept: [ItemType.Space, ItemType.Button],
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }

      // return {
      //   id: 0,
      // };
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{ border: canDrop ? "1px solid blue" : "none" }}
      className="p-[24px] h-full"
    >
      {renderComponents(components)}
    </div>
  );
};

export default Stage;
