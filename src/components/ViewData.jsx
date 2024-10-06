import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

function ViewData({ handleEdit }) {

    let [user, setUser] = useState([]);
    useEffect(() => {
        recordData()
    }, [])

    let recordData = () => {
        fetch('http://localhost:3000/user', {
            method: 'GET',
        }).then((res) => res.json()).then((data) => {
            setUser(data)
        }).catch((error) => {
            console.error(error);
        })
    }

    let handleDelete = (id) => {
        fetch(`http://localhost:3000/user/${id}`, {
            method: 'DELETE'
        }).then(() => recordData()).catch((error) => {
            console.error(error);
        })
        toast.error("User deleted successfully !", {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
    }

    return (
        <>

        {/* button go to  add user page */}
        <button className='viewPage'>
            <Link to="/">Add User</Link>
        </button>


            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>City</th>
                            <th>Hobby</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            user.length>0 ?
                            user.map((val, idx) => (
                                <tr>
                                    <td>{ val.name }</td>
                                    <td>{ val.email }</td>
                                    <td>{ val.phone }</td>
                                    <td>{ val.city }</td>
                                    <td>{ val.gender }</td>
                                    <td>{ val.hobby.toString() }</td>
                                    <td>
                                        <div className="button-table">
                                            <button onClick={ () => handleDelete(val.id) }>delete</button>
                                            <button><Link to={ `/${val.id}` } >Edit</Link></button>
                                        </div>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan="7">No data found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </>
    )
}

export default ViewData
