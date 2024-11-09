/* eslint-disable react/no-unescaped-entities */
import CommmonForm from "@/Components/Common/Form"
import { LoginFormControl } from "@/Config"
import { loginUser } from "@/Store/auth-slice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

const initialState ={
  email: '',
  password: '',
}
const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();

  const [formData, setFormData] = useState(initialState);

  function onSubmit(event){
    event.preventDefault();
   dispatch(loginUser(formData)).then(data=>{
    if(data?.payload?.success){ 
      toast({
        title:data?.payload?.message,
       })
       navigate('/shop/home')
      }
      else{
        toast({
          title: data?.payload?.message,        
          variant: "destructive",    
          duration: 5000         
       })
      }
   })
   
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Log in to your Account
        </h1>
        <p className="mt-2"> Don't have an account? 
          <Link className=" ml-2 text-blue-500 font-semibold hover:underline " to="/auth/register">Register</Link>
        </p>
      </div>
     <CommmonForm
     formControls={LoginFormControl}
     buttonText={'Log in'}
     formData={formData}
     setFormData={setFormData}     
     onSubmit={onSubmit}
     />      
    </div>
  )
}

export default Login

