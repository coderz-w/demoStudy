// src/editor/stores/components.ts
import { create } from "zustand";

export interface Component {
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

interface State {
  components: Component[];
  curComponentId?: number | null;
  curComponent: Component | null;
}

interface Action {
  /**
   * 添加组件
   * @param component 组件属性
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addComponent: (component: Component, parentId?: any) => void;
  setCurComponentId: (id: number | null) => void;
  /**
   * 更新组件属性
   * @param componentId 组件id
   * @param props 新组件属性
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateComponentProps: (componentId: number, props: any) => void;
}

export const useComponets = create<State & Action>((set) => ({
  components: [],
  curComponentId: null,
  curComponent: null,
  addComponent: (component, parentId) =>
    set((state) => {
      if (parentId) {
        const parentNode = getComponentById(parentId, state.components);
        if (parentNode?.children) {
          parentNode.children.push(component);
        } else {
          if (parentNode) {
            parentNode.children = [component];
          }
        }
        return { components: [...state.components] };
      }
      return { components: [...state.components, component] };
    }),
  setCurComponentId: (componentId) =>
    set((state) => ({
      curComponentId: componentId,
      curComponent: getComponentById(componentId, state.components),
    })),
  updateComponentProps: (componentId, props) =>
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.props = { ...component.props, ...props };
        return { components: [...state.components] };
      }
      return { components: [...state.components] };
    }),
}));

function getComponentById(
  id: number | null,
  components: Component[]
): Component | null {
  for (const component of components) {
    console.log(component.id,id)
    if (component.id == id) return component;
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result) return result;
    }
  }
  return null;
}
