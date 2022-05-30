import { DeleteFilled } from '@ant-design/icons/lib/icons';
import { Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Loading } from '../../components/Loading/Loading';
import { ErrorMessage, SuccessMessage } from '../../components/Messages/Messages';
import { AddBurntPreset } from '../../components/Presets/AddBurntPresets';
import { AddIntakePreset } from '../../components/Presets/AddIntakePresets';
import { UpdatePresets } from '../../components/Presets/UpdatePresets';

export const AdminPresets = () => {
  const [presets, setPresets] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllPresets = async () => {
    setLoading(true);
    await axios.get('/api/presets/get', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      setLoading(false)
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

  const updateFunction = () => {
    getAllPresets();
  }

  const deleteHandler = async (id) => {
    await axios.delete(`/api/presets/delete/${id}`, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      if (res.status === 200) {
        SuccessMessage(res.data.successMessage)
        getAllPresets();
      } else {
        ErrorMessage(res.data.errorMessage)
      }
    })

  }

  return (
    <div className='m-5'>
      <div className='Presets'>
        {/* Create Presets */}
        <div className='d-flex justify-content-end gap-4 mt-4'>
          <div>
            <AddIntakePreset updateFunction={updateFunction} />
          </div>
          <div>
            <AddBurntPreset updateFunction={updateFunction} />
          </div>
        </div>

        {/* Show Presets */}
        {
          loading ?
            <Loading />
            :
            <>
              <div>
                <h2>Calories Intake Presets</h2>
              </div>
              <div className='table-responsive'>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Presets Title</th>
                      <th scope="col">Value</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      presets.length > 0 && presets.filter(f => f.category == 'intake').map((preset, index) => {
                        return (
                          <>
                            <tr key={preset._id} style={{ borderBottom: '1px solid black' }}>
                              <td>{index + 1}:</td>
                              <td scope="col">{preset.title}</td>
                              <td scope="col">{preset.value}kJ</td>
                              <th>
                                <Link className='btn'><UpdatePresets preset={preset} updateFunction={updateFunction} /></Link>
                                <Button type='primary' onClick={() => deleteHandler(preset._id)}><DeleteFilled /></Button>
                              </th>
                            </tr>
                          </>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div className='my-4'>
                <h2>Calories Burnt Presets</h2>
              </div>
              <div className='table-responsive'>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Presets Title</th>
                      <th scope="col">Value</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      presets.length > 0 && presets.filter(f => f.category == 'burnt').map((preset, index) => {
                        return (
                          <>
                            <tr key={preset._id} style={{ borderBottom: '1px solid black' }}>
                              <td>{index + 1}:</td>
                              <td scope="col">{preset.title}</td>
                              <td scope="col">{preset.value}kJ</td>
                              <th>
                                <Link className='btn'><UpdatePresets preset={preset} updateFunction={updateFunction} /></Link>
                                <Button type='primary' onClick={() => deleteHandler(preset._id)}><DeleteFilled /></Button>
                              </th>
                            </tr>
                          </>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </>
        }
      </div>
    </div>
  )
}
