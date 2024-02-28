"use client"

import React from "react";
import { FieldData, InputForm } from "shortiny/core/models/form.interface";
import Button from "../button/button";
import { UseFormReturn, useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginEnumSchema, LoginSchema } from "shortiny/core/schemas";

export default function Form({ data, form }: { data: InputForm<any>, form: UseFormReturn<any> }) { //TODO: React.FC<FormFieldProps>


  const onSubmit = (d: any)=>{
    
    Object.values(d).forEach((val)=>{
      console.log(typeof val);
    })

    console.log( data,  form)
  
   
  }

  
  return <form onSubmit={form.handleSubmit(onSubmit)}>
  {
   data.fields.map((field: FieldData<LoginEnumSchema>) => {
    return (
      <div className="mb-8" key={field.label}>
        <label
          htmlFor="longUrl"
          className="text-md mb-2 block font-bold text-black dark:text-zinc-100"
        >
          {field.label}
        </label>
        
        <input
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          type="text"
          {...form.register(field.id)}
          id={field.id}
        />
         <span className="error-message">{JSON.stringify(form.control._formState.errors)}</span>
      </div>
    );
  })
   }
   <Button onClick={()=>{}}>
      <span>{data.action.label}</span>
   </Button>
  </form>
}
