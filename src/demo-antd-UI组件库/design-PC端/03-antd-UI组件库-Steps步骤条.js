import React, { useState } from 'react';
import { Button, message, Steps } from 'antd';
const steps = [
    {
        title: 'First',
        content: 'First-content',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    },
];
export default function Test() {
    const [current, setCurrent] = useState(0);
    // 下一步
    const next = () => {
        setCurrent(current + 1);
    };
    //   上一步
    const prev = () => {
        setCurrent(current - 1);
    };
    // 返回一个数组对象
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    return (
        <div className='app-assembly'>
            <h1>03-antd-UI组件库-Steps步骤条组件</h1>
            <Steps current={current} items={items} />
            <div className="steps-content">当前步骤： {current === steps.length - 1?<span>{current}完成</span>:current } {steps[current].content}</div>
            <div className="steps-action">
                {current < steps.length - 1 && ( <Button type="primary" onClick={() => next()}>  下一步 </Button>  )}

                {current === steps.length - 1 && (
                    <Button type="primary" danger onClick={() => message.success('Processing complete!')}>  完成 </Button>
                )}
                {current > 0 && (  <Button style={{  margin: '0 8px',  }}  onClick={() => prev()} >上一步</Button> )}
            </div>
        </div>
    )
}
