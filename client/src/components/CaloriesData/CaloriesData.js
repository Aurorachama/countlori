import { EditFilled } from '@ant-design/icons/lib/icons';
import { Button, Modal } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Loading } from '../Loading/Loading';
import { ErrorMessage, SuccessMessage } from '../Messages/Messages';

export const CaloriesData = ({ updateFunction, calId }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [presets, setPresets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [intake, setIntake] = useState('')
    const [burnt, setBurnt] = useState('')


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const getAllPresets = async () => {
        await axios.get('/api/presets/get', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            console.log(res.data);
            if (res.status === 200) {
                setPresets(res.data);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }

    useEffect(() => {
        getAllPresets()
        return () => {
        }
    }, []);

    const submitHandler = async () => {
        setLoading(true);
        calId ?
            await axios.put(`/api/calories/update/${calId}`, { intake, burnt }, {
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
            :
            await axios.post('/api/calories/add', { intake, burnt }, {
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
                {
                    calId ?
                        <EditFilled />
                        :
                        <span>Add Calorie Data</span>
                }
            </Button>
            <Modal title="Add Calories Data" footer={false} visible={isModalVisible} onCancel={handleCancel}>
                {
                    loading ?
                        <Loading />
                        :
                        <form>
                            <div className="form-floating">
                                <input type="value" className="form-control" id="floatingInput" placeholder="Enter Calorie Intake" onChange={(e) => setIntake(e.target.value)} />
                                <label for="floatingInput">Enter Calorie Intake</label>
                            </div>
                            <div className='text-center my-3'>Or</div>
                            <div className="form-floating mb-4">
                                <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(e) => setIntake(e.target.value)}>
                                    <option selected>Choose...</option>
                                    {
                                        presets.length > 0 && presets.filter(f => f.category == 'intake').map(preset => {
                                            return (
                                                <option value={preset.value}>{preset.title}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label for="floatingSelect">Choose from presets</label>
                            </div>
                            <div className="form-floating">
                                <input type="number" className="form-control" id="floatingInput2" placeholder="Enter Calorie Burnt" onChange={(e) => setBurnt(e.target.value)} />
                                <label for="floatingInput2">Calories Burnt</label>
                            </div>
                            <div className='text-center my-3'>Or</div>
                            <div className="form-floating mb-4">
                                <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(e) => setBurnt(e.target.value)}>
                                    <option selected>Choose...</option>
                                    {
                                        presets.length > 0 && presets.filter(f => f.category == 'burnt').map(preset => {
                                            return (
                                                <option value={preset.value}>{preset.title}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label for="floatingSelect">Choose from presets</label>
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
