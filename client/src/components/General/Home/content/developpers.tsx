import { ConfigProvider, Tabs } from 'antd';


const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Development & IT',
        children: `Development is a process that creates growth.`,
    },
    {
        key: '2',
        label: 'Design & Creative',
        children: `Design & Creative is a process that creates growth`,
    },
    {
        key: '3',
        label: 'UI & UX',
        children: 'UI & UX is a process that creates growth',
    },
    {
        key: '4',
        label: 'Web Deveopment',
        children: 'Web Deveopment is a process that creates growth',
    },
];

import type { TabsProps } from 'antd';
import Carousel from './Carousel';
const DeveView = () => {
    return (<>
        <div className=" min-h-[5vh]  grid grid-cols-1  text-sm place-items-center  m-5">
            <div className="my-2 text-red-500 ">
                <p className="font-semibold text-4xl">Top Work Categories</p>
            </div>
            <div className="my-2 " >
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#ef4444',
                            borderRadius: 6,
                        },
                    }}
                >
                    <Tabs
                        tabBarGutter={60}
                        className='text-red-500 break-all'
                        defaultActiveKey="1"
                        items={items}
                        size='large'
                        style={{ textAlign: 'center' }}
                    />
                </ConfigProvider>
            </div>
            <div>
                <Carousel />
            </div>
        </div>
    </>);
}


export default DeveView;