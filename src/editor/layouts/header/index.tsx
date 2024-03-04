import { Button, Space } from 'antd';
import { useState } from 'react';
import { useComponets } from '../../stores/components';
// import { usePageDataStore } from '../../stores/page-data';
import DefineVariable from './define-variable';

const Header: React.FC = () => {

  const { mode, setMode, setCurComponentId } = useComponets();


  const [variableVisible, setVariableVisible] = useState(false);


  return (
    <div className='flex justify-end w-[100%] px-[24px]'>
      <Space>
        {mode === 'edit' && (
          <>
            <Button
              onClick={() => {
                setVariableVisible(true);
              }}
              type='primary'
            >
              定义变量
            </Button>
            <Button
              onClick={() => {
                setMode('preview');
                setCurComponentId(null);
              }}
              type='primary'
            >
              预览
            </Button>
          </>
        )}
        {mode === 'preview' && (
          <Button
            onClick={() => { setMode('edit') }}
            type='primary'
          >
            退出预览
          </Button>
        )}
      </Space>
      <DefineVariable
        open={variableVisible}
        onCancel={() => {
          setVariableVisible(false);
        }}
      />
    </div>
  )
}

export default Header;