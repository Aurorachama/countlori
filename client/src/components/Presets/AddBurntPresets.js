import { Button, Modal } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Loading } from '../Loading/Loading';
import { ErrorMessage, SuccessMessage } from '../Messages/Messages';

export const AddBurntPreset = ({ updateFunction }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [presetData, setPresetData] = useState({
        title: '',
        value: ''
    });

    const { title, value } = presetData;

    const handleChange = (e) => {
        setPresetData({
            ...presetData,
            [e.target.name]: e.target.value
        })
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.post('/api/presets/add', { title, value, category: 'burnt' }, {
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
                Add Calorie Burnt Presets
            </Button>
            <Modal title="Add Calorie Burnt Presets" footer={false} visible={isModalVisible} onCancel={handleCancel}>
                {
                    loading ?
                        <Loading />
                        :
                        <form onSubmit={submitHandler}>
                            <div className="form-floating mb-3">
                                <input required name='title' type="text" className="form-control" id="floatingInput" placeholder="Enter Title" onChange={handleChange} />
                                <label for="floatingInput">Title</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required name='value' type="number" className="form-control" id="floatingInput2" placeholder="Enter Calorie Burnt" onChange={handleChange} />
                                <label for="floatingInput2">Calories</label>
                            </div>
                            <div className='my-3 text-center'>
                                <button type='submit' className='btn btn-dark w-25'>Submit</button>
                            </div>
                        </form>
                }
            </Modal>
        </>
    );
};
