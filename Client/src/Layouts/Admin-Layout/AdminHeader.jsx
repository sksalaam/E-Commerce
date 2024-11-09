import { Button } from "@/Components/ui/button"
import { logoutUser } from "@/Store/auth-slice"
import { Menu, LogOut } from "lucide-react"
import { useDispatch } from "react-redux"
import { toast } from "@/hooks/use-toast"

const AdminHeader = ({setOpen}) => {
  const dispatch = useDispatch()

  const handleLogout = () =>{
   dispatch(logoutUser()) 
   toast({
    title: 'Logout Successfull!'
  })
  }
  return <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
       <Button onClick={()=> setOpen(true)} className='lg:hidden sm:block'>
       <Menu />
        <span className="sr-only">Toggle Menu</span>
       </Button>
       <div className="flex flex-1 justify-end">
        <Button onClick={handleLogout} className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow'>
        <LogOut/>
          Logout          
        </Button>
        
       </div>
  </header>
}

export default AdminHeader
