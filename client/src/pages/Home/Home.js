import { Button } from 'antd';
import axios from 'axios';
import { DeleteFilled } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaloriesData } from '../../components/CaloriesData/CaloriesData';
import { ErrorMessage, SuccessMessage } from '../../components/Messages/Messages';
import { Loading } from '../../components/Loading/Loading';

export const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await axios.get('/api/calories/get', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      setLoading(false);
      if (res.status === 200) {
        setData(res.data);
      } else {
        ErrorMessage(res.data.errorMessage);
      }
    })
  }

  useEffect(() => {
    getData()
    return () => {
    }
  }, []);


  const deleteHandler = async (id) => {
    await axios.delete(`/api/calories/delete/${id}`, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      if (res.status === 200) {
        SuccessMessage(res.data.successMessage)
        getData();
      } else {
        ErrorMessage(res.data.errorMessage)
      }
    })

  }

  const updateFunction = () => {
    getData();
  }

  return (
    <div className='home m-5'>
      <div className='d-flex justify-content-end gap-3'>
        <CaloriesData updateFunction={updateFunction} />
      </div>
      {
        loading ?
          <Loading />
          :
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Calories Intake</th>
                  <th scope="col">Calories Burnt</th>
                  <th scope="col">Total</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.length > 0 && data.map((d, index) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{d.updatedAt}</td>
                        <td>{d.intake}kJ</td>
                        <td>{d.burnt}kJ</td>
                        <td>{d.total}kJ</td>
                        <th>
                          <Link className='btn'><CaloriesData calId={d._id} updateFunction={updateFunction} /></Link>
                          <Button type='primary' onClick={() => deleteHandler(d._id)}><DeleteFilled /></Button>
                        </th>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <div className='text-end m-5'>
              <h5>Total Balance: {data?.reduce((a, b) => a + b.total, 0)}kJ</h5>
            </div>
          </div>
      }
    </div>
  )
}
