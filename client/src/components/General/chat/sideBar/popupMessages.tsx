import React, { useMemo, useEffect } from 'react';
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];
const Context = React.createContext({ name: 'Default' });
interface ReusableNotificationProps {
    showNotification: boolean;
    title: string,
    content: string
    status: 'info' | 'success' | 'warning' | 'error'; 
}

const ReusableNotification: React.FC<ReusableNotificationProps> = ({ showNotification, title, content, status }) => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement) => {
        if(status === 'info'){
            api.info({
                message: title,
                description: (
                    <Context.Consumer>
                        {() => `${content}!`}
                    </Context.Consumer>
                ),
                placement,
            });
        }else{

            api.success({
                message: title,
                description: (
                    <Context.Consumer>
                        {() => `${content}!`}
                    </Context.Consumer>
                ),
                placement,
            });
        }
        
    };
    const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);
    useEffect(() => {
        if (showNotification) {
            openNotification('bottomRight');
        }
    }, [showNotification]);
    return (
        <>
            {showNotification && (
                <Context.Provider value={contextValue}>
                    {contextHolder}
                </Context.Provider>
            )}
        </>
    );
};

export default ReusableNotification;
