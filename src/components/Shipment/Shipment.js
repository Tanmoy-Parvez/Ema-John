import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  return (

    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

    
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} />

      <input name="name" defaultValue={loggedInUser.email} ref={register({ required: true })} />

      <input name="address" placeholder="Enter your address" ref={register({ required: true })} />
      {errors.address && <span className="error">Address is required</span>}

      <input name="phone" placeholder="Enter your phone number" ref={register({ required: true })} />
      {errors.phone && <span className="error">Phone number is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;