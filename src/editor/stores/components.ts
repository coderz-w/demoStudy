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
}

interface Action {
  /**
   * 添加组件
   * @param component 组件属性
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addComponent: (component: Component, parentId?: any) => void;
}

export const useComponets = create<State & Action>((set) => ({
  components: [],
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
        console.log({components:[...state.components]})
        return {components:[...state.components]}
      }
      return { components: [...state.components, component] };
    }),
}));

function getComponentById(
  id: number,
  components: Component[]
): Component | null {
  for (const component of components) {
    if (component.id === id) return component;
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result) return result;
    }
  }
  return null;
}
