import React, { useState } from 'react';
import { Button, Modal ,Pagination } from 'antd';
export default function Test() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        console.log('确定')
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        console.log('取消')
    };
    return (
        <div className='app-assembly'>
            <h1>08-antd-UI组件库-Modal对话框 组件</h1>
            <>
                <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>
                {/* open属性 - 对话框是否可见(true或false) onOk属性-点击确定回调  onCancel属性-点击遮罩层或右上角叉或取消按钮的回调*/}
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

                <Pagination    onChange={()=>{}} total={103} showSizeChanger={false} showTitle={false}></Pagination>
            </>
        </div>
    )
}
