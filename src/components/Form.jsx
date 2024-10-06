import React, { useEffect, useState } from 'react'
import { json, Link, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

function Form() {

    let [user, setUser] = useState({});
    let [error, setError] = useState({});
    let [hobby, setHobby] = useState([])
    const { id } = useParams();
    let navigate = useNavigate()

    let isValidation = () => {
        let errors = {};
        if (!user.name) errors.name = "Name is require"
        if (!user.email) errors.email = "Email is require"
        if (!user.phone) errors.phone = "Phone is require"
        if (!user.city) errors.city = "City is require"
        if (!user.hobby) errors.hobby = "Hobby is require"
        if (!user.gender) errors.gender = "Gender is require"
        setError(errors);
        return Object.keys(errors).length == 0
    }



    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/user/${id}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then((data) => {
                    setUser(data);
                    setHobby(data.hobby)
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id])

    let handleChange = (e) => {
        let { name, value } = e.target;
        let newHobby = [...hobby]

        if (name == 'hobby') {
            if (e.target.checked) {
                newHobby.push(value)
            } else {
                let pos = newHobby.findIndex((v, i) => value == v)
                newHobby.splice(pos, 1)
            }
            value = newHobby
            setHobby(newHobby)
        }
        setUser({ ...user, [name]: value })
        setError(!isValidation)
    }

    let handleSubmit = (e) => {
        e.preventDefault();

        if (!isValidation()) return false

        if (id) {
            console.log(id);

            fetch(`http://localhost:3000/user/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(user)
            }).then((res) => res.json()).then(() => {
                toast.success("User updated successfully !", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }).catch((error) => {
                console.log(error);
            })
        } else {
            fetch('http://localhost:3000/user', {
                method: 'POST',
                body: JSON.stringify(user)
            }).then((res) => res.json()).then(() => {
                toast.success("User added successfully !", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }).catch((error) => {
                console.error(error);
            })

        }
        navigate('/view')
        setUser({})
    }

    return (
        <>
            <ToastContainer />
            <button className='viewPage'>
                <Link to="/view">View User</Link>
            </button>
            <div className="container">
                <form onSubmit={ handleSubmit }>
                    <h2>{ id ? "Update User" : "Add User" }</h2>

                    <div className="content">
                        <div className="input-box">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter full name"
                                name="name"
                                value={ user.name || "" }
                                onChange={ handleChange }

                            />
                            <div className="error">{ error.name }</div>
                        </div>
                        <div className="input-box">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                placeholder="Enter your valid email address"
                                name="email"
                                value={ user.email || "" }
                                onChange={ handleChange }

                            />
                            <div className="error">{ error.email }</div>
                        </div>
                        <div className="input-box">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="number"
                                placeholder="Enter Phone number"
                                name="phone"
                                value={ user.phone || "" }
                                onChange={ handleChange }

                            />
                            <div className="error">{ error.phone }</div>
                        </div>
                        <div className="input-box">
                            <label htmlFor="city">City</label>
                            <select name="city" value={ user.city || "" } onChange={ handleChange }>
                                <option disabed selected value='' >---Select city---</option>
                                <option value="surat">Surat</option>
                                <option value="ahmedabad">Ahmedabad</option>
                                <option value="vapi">Vapi</option>
                                <option value="rajkot">Rajkot</option>
                            </select>
                            <div className="error">{ error.city }</div>
                        </div>

                        <span className="gender-title">Hobby</span>
                        <div className="gender-category">
                            <input
                                type="checkbox"
                                name="hobby"
                                value="coding"
                                checked={ hobby.includes('coding') ? "checked" : "" }
                                onChange={ handleChange }
                            />
                            <label htmlFor="coding">Coding</label>
                            <input
                                type="checkbox"
                                name="hobby"
                                value="dancing"
                                checked={ hobby.includes('dancing') ? "checked" : "" }
                                onChange={ handleChange }
                            />
                            <label htmlFor="dancing">Dancing</label>
                            <input
                                type="checkbox"
                                name="hobby"
                                value="singing"
                                checked={ hobby.includes('singing') ? "checked" : "" }
                                onChange={ handleChange }
                            />
                            <label htmlFor="singing">Singing</label>
                            <input
                                type="checkbox"
                                name="hobby"
                                value="writing"
                                checked={ hobby.includes('writing') ? "checked" : "" }
                                onChange={ handleChange }
                            />
                            <label htmlFor="writing">Writing</label>
                            <div className="error">{ error.hobby }</div>
                        </div>
                        <span className="gender-title">Gender</span>
                        <div className="gender-category">
                            <input
                                type="radio"
                                name="gender"
                                id="male"
                                value="male"
                                checked={ user.gender == "male" }
                                onChange={ handleChange }
                            />
                            <label htmlFor="male">Male</label>
                            <input
                                type="radio"
                                name="gender"
                                id="female"
                                value="female"
                                checked={ user.gender == "female" }
                                onChange={ handleChange }
                            />
                            <label htmlFor="female">Female</label>
                            <input
                                type="radio"
                                name="gender"
                                id="other"
                                value="other"
                                checked={ user.gender == "other" }
                                onChange={ handleChange }
                            />
                            <label htmlFor="other">Other</label>
                            <div className="error">{ error.gender }</div>
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="submit">
                            { id ? "Update" : "Create" }

                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Form
