
import { LayoutDashboard, ShoppingBasket, ShoppingCart } from "lucide-react"
import { ChartNoAxesCombined } from "lucide-react"
import { Fragment } from "react"
import { useNavigate } from "react-router-dom"


export const adminSidebarMenuItems = [
  {
      id : 'dashboard',
      title : 'Dashboard',
      path : '/admin/dashboard',
      icon :<LayoutDashboard />
  },
  {
      id : 'products',
      title : 'Products',
      path : '/admin/products',
      icon : <ShoppingBasket />
  },
  {
      id : 'orders',
      title : 'Orders',
      path : '/admin/orders',
      icon : <ShoppingCart />
  }
]
function MenuItems (){
  const navigate = useNavigate();
   return <nav className="mt-8 flex-col flex gap-2">
    {    
    adminSidebarMenuItems.map(menuItem=> (
    <div 
        key={menuItem.id} 
        onClick={()=> navigate(menuItem.path)}
        className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground ">
        {menuItem.icon}
        <span>{menuItem.title}</span>
    </div>))
    
   }     
   </nav>
}
const AdminSideBar = () => {
  const navigate = useNavigate();

  return (
 <Fragment>
  <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
    <div
     onClick={() => navigate('/admin/dashboard')}
     className="flex cursor-pointer items-center gap-2">
    <ChartNoAxesCombined  strokeWidth={2.25} />
    <h1 className="text-2xl font-bold">Admin Panel</h1>
    </div>
   <MenuItems/>
  </aside> 
 </Fragment>
  )
}

export default AdminSideBar
