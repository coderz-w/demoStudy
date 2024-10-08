import { Form, Select } from "antd";
import { useEffect } from "react";
import { ItemType } from "../../item-type";
import { useComponets } from "../../stores/components";
import SettingFormItemInput from "../../common/setting-form-item.tsx/input";

const componentSettingMap = {
  [ItemType.Button]: [
    {
      name: "type",
      label: "按钮类型",
      type: "select",
      options: [
        { label: "主按钮", value: "primary" },
        { label: "次按钮", value: "default" },
      ],
    },
    {
      name: "text",
      label: "文本",
      type: "input",
    },
  ],
  [ItemType.Space]: [
    {
      name: "size",
      label: "间距大小",
      type: "select",
      options: [
        { label: "大", value: "large" },
        { label: "中", value: "middle" },
        { label: "小", value: "small" },
      ],
    },
  ],
};

const ComponentAttr = () => {
  const [form] = Form.useForm();

  const { curComponentId, curComponent, updateComponentProps } = useComponets();

  useEffect(() => {
    // 初始化表单
    form.setFieldsValue(curComponent?.props);
  }, [curComponent]);

  // 监听表单值变化，更新组件属性
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function valueChange(changeValues: any) {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues);
    }
  }

  /**
   * 动态渲染表单元素
   * @param setting 元素配置
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function renderFormElememt(setting: any) {
    const { type, options } = setting;

    if (type === "select") {
      return <Select options={options} />;
    } else if (type === "input") {
      return <SettingFormItemInput />;
    }
  }

  if (!curComponentId || !curComponent) return null;

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
    >
      {(componentSettingMap[curComponent?.name] || []).map((setting) => {
        return (
          <Form.Item
            key={setting.name}
            name={setting.name}
            label={setting.label}
          >
            {renderFormElememt(setting)}
          </Form.Item>
        );
      })}
    </Form>
  );
};

export default ComponentAttr;
