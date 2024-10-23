import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const Contact = () => {
  const [info, setInfo] = useState([])
  const Navigate = useNavigate()
  const {register, handleSubmit, reset} = useForm()

  const onSubmit = (data)=>{
    setInfo([...info, data])
    reset()
  }

  // console.log(info)

  return (
    <div className="w-screen h-screen flex items-center justify-center text-white  px-[10%] relative">
      <i
      onClick={() => Navigate(-1)}
      className="ri-arrow-left-line text-white text-2xl font-bold  hover:text-[#6556CD] absolute top-[3%] left-[3%] "
      ></i>
      <form onSubmit={handleSubmit( data =>onSubmit(data) )} 
       className="flex flex-col  border border-2-white w-1/2 px-4 py-4 rounded-lg "
       >
        <h1 className="text-3xl mb-5 font-semibold ">Contact us</h1>
        <input
          type="text"
          required
          placeholder="Name"
          className="px-3 py-2 rounded-md bg-[#6556CD] outline-none mb-5"
          {...register('name') }
        />
        <input
          type="email"
          required
          placeholder="Email"
          className="px-3 py-2 rounded-md bg-[#6556CD] outline-none mb-5"
          {...register('email')}
        />
        <textarea
          placeholder="Messge"
          required
          rows={5}
          className="px-3 py-2 rounded-md bg-[#6556CD] outline-none mb-5"
          {...register('message')}
        ></textarea>
        <button className="bg-[#6556CD] w-1/4  py-2 text-xl font-semibold rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
