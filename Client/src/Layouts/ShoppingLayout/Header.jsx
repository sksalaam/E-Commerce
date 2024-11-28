import { Avatar, AvatarFallback } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"
import { shoppingViewHeaderMenuItems } from "@/Config"
import { toast } from "@/hooks/use-toast"
import { logoutUser } from "@/Store/auth-slice"
import { House, LogOut, MenuIcon, ShoppingCart, UserCheck} from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import UserCartWrapper from "./Cart-Wrapper"
import { fetchCartItems } from "@/Store/Shop/Cart-Slice"

function MenuItems (){
  return <nav className="flex flex-col mb-3 lg:mb-0 items-start gap-6 lg:flex-row" >
       {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link
          to={menuItem.path}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Link>
      ))}
  </nav>
}
function HeaderRightContent ({}){
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const dispatch = useDispatch()

  const handleLogout =()=>{
    dispatch(logoutUser()) 
    toast({
     title: 'Logout Successfull!'
   })
  }

  useEffect(()=>
    {
      dispatch(fetchCartItems(user?.id))
    },[dispatch]
  )
  return <div className=" flex lg:items-center lg:flex-row flex-col gap-4">
   <Sheet open={openCartSheet} onOpenChange={()=> setOpenCartSheet(false)}>
   <Button onClick ={()=> setOpenCartSheet(true)} variant=" outline" size='icon'>
    <ShoppingCart className="w-6 h-6" />
    <span className="sr-only">User Cart</span>
    </Button>
    <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
   </Sheet>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <Avatar className="bg-black cursor-pointer">
        <AvatarFallback className="bg-black text-white font-extrabold">
          {user.userName.charAt(0).toUpperCase()}
        </AvatarFallback>
       </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='right' className='w-56 '>
        <DropdownMenuLabel>
          Logged in as {user?.userName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick ={()=> navigate('/shop/account')}>
        <UserCheck className="mr-2 h-4 w-4" />
        Account
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
}
const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
<header className="sticky top-0 z-40 w-full border-b bg-background">
<div className="flex h-16 items-center justify-between px-4 md:px-6">
  <Link to='/shop/home' className="flex items-center gap-2">
  <House className="h-6 w-6"/>
  <span className="font-bold">ECommerce</span>
  </Link>
  <Sheet>
    <SheetTrigger asChild>
      <Button className='lg:hidden' variant='outline' size='icon'>
        <MenuIcon className="h-6 w-6"/>
        <span className=" sr-only">
          Toggle Header Menu
        </span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className='w-full max-w-xs '>
  <MenuItems/>
  <HeaderRightContent/>
    </SheetContent>
  </Sheet>
  <div className="hidden lg:block ">
    <MenuItems/>
  </div>
 
    <div className="hidden lg:block"> 
      <HeaderRightContent />
    </div>

  </div>
</header>
  )
}

export default Header
