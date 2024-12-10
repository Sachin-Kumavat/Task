import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { createUser } from '../features/userDetailSlice';

const Form = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState({});
    const getUserData=(e)=>{
        setUsers({...users, [e.target.name]: e.target.value});
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("users.....",users);
        dispatch(createUser(users))
    }
    
    return (
        <div>
            <form className='w-25 mx-auto my-5' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" onChange={getUserData}/>

                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" onChange={getUserData} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input type="text" className="form-control" name="age" onChange={getUserData}/>
                </div>
                <div className="mb-3">
                    <input className="form-check-input mx-1" type="radio" name="gender" value="Male" onChange={getUserData} />
                    <label className="form-check-label">Male</label>
                </div>
                <div className="mb-3">
                    <input className="form-check-input mx-1" type="radio" name="gender" value="Female" checked onChange={getUserData} />
                    <label className="form-check-label">Female</label>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Form;