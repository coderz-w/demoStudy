import { Segmented } from 'antd';
import type { SegmentedValue } from 'antd/es/segmented';
import { useState } from 'react';
import { useComponets } from '../../stores/components';
import ComponentAttr from './attr';
import ComponentEvent from './event';

const Setting: React.FC = () => {

  const { curComponentId, curComponent } = useComponets();

  const [key, setKey] = useState<SegmentedValue>('属性');

  if (!curComponentId || !curComponent) return null;

  return (
    <div>
      <Segmented value={key} onChange={setKey} block options={['属性', '事件']} />
      <div className='pt-[20px]'>
        {
          key === '属性' && (
            <ComponentAttr />
          )
        }
        {
          key === '事件' && (
            <ComponentEvent />
          )
        }
      </div>
    </div>
  )
}

export default Setting;
