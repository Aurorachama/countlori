import { EditFilled } from '@ant-design/icons/lib/icons';
import { Button, Modal } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Loading } from '../Loading/Loading';
import { ErrorMessage, SuccessMessage } from '../Messages/Messages';

export const UpdatePresets = ({ preset, category, updateFunction }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        title: '',
        value: ''
    });

    const { title, value } = data;

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const showModal = () => {
        setIsModalVisible(true);
        setData(preset);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.put(`/api/presets/update/${preset._id}`, { title, value, category: category }, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                SuccessMessage(res.data.successMessage);
                updateFunction();
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })

    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                <EditFilled />
            </Button>
            <Modal title="Update Preset" footer={false} visible={isModalVisible} onCancel={handleCancel}>
                {
                    loading ?
                        <Loading />
                        :
                        <form>
                            <div className="form-floating mb-3">
                                <input required value={title} name='title' type="text" className="form-control" id="floatingInput" placeholder="Enter Title" onChange={handleChange} />
                                <label for="floatingInput">Title</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required value={value} name='value' type="number" className="form-control" id="floatingInput2" placeholder="Enter Calorie Intake" onChange={handleChange} />
                                <label for="floatingInput2">Calories</label>
                            </div>
                            <div className='my-3 text-center'>
                                <button onClick={submitHandler} className='btn btn-dark w-25'>Submit</button>
                            </div>
                        </form>
                }
            </Modal>
        </>
    );
};
