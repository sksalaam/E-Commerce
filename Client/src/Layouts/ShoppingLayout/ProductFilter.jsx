import { Checkbox } from "@/Components/ui/checkbox"
import { Label } from "@/Components/ui/label"
import { Separator } from "@/Components/ui/separator"
import { filterOptions } from "@/Config"
import { Fragment } from "react"


const ProductFilter = ({filters, handleFilter}) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
        <div className="p-4 border-b">
            <h2 className="text-lg font-bold">Filters</h2>
        </div>
        <div className=" p-4 space-y-4">
         {
          Object.keys(filterOptions).map((key) => (
            <Fragment>
              <div>
              <h3 className="text-base font-bold">{key}</h3>
              <div  className="grid gap-2 mt-2">
                {
                  filterOptions[key].map(option => 
                  <Label className="flex font-normal items-center gap-2">
                    <Checkbox 
                    checked={
                      filters && Object.keys(filters).length > 0 &&
                      filters[key] && filters[key].indexOf(option.id) > -1
                    }
                    onCheckedChange={()=>handleFilter(key, option.id)}/>
                    {option.label} 
                  </Label>)
                }
            </div>
              </div>
              <Separator/>
            </Fragment>
          ))
         }
        </div>
      
    </div>
  )
}

export default ProductFilter
