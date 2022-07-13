import { useState } from 'react';
import Router from 'next/router';
import useRequestHook from '../../hooks/use-request';
import BaseLayout from '../../components/base-layout';
import buildClient from "../../api/build-client";

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequestHook({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async event => {
        event.preventDefault();


        await doRequest();
    }

  return (
    <div>
    <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
            <label>Email Address</label>
            <input value={email} 
            onChange={e => setEmail(e.target.value)} 
            className="form-control" />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} 
            type="password" 
            className="form-control" />
        </div>
        <br></br>
        {errors}
        <button className="btn btn-primary">Sign Up</button>
    </form>
    </div>
  )
}

export default Signup;

