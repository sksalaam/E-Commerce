import { Button } from "@/Components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { sortOptions } from "@/Config"
import ProductFilter from "@/Layouts/ShoppingLayout/ProductFilter"
import ShoppingProductTile from "@/Layouts/ShoppingLayout/ProductTile"
import { fetchAllProducts } from "@/Store/Admin/Products-Slice"
import { ArrowUpDownIcon } from "lucide-react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


const Listing = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchAllProducts)
  },[])
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 ">
    <ProductFilter/>
    <div className="bg-background w-full rounded-lg shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-bold">All Products</h2>
        <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>    
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  // handleGetProductDetails={handleGetProductDetails}
                  // product={productItem}
                  // handleAddtoCart={handleAddtoCart}
                />
                
              ))
            : null}
        </div>
    </div>
    {/* <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      /> */}
    </div>
  )
}

export default Listing
