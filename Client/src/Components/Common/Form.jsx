import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const CommmonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled
}) => {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";
    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            value={value}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select onValueChange={(value) =>
            setFormData({
              ...formData,
              [getControlItem.name]: value,
            })
          }

           value={value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : "nul"}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            value={value}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            rows={getControlItem.rows}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );

        break;

      default:
        element = (
          <Input
            value={value}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="felx flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5 " key={controlItem.name}>
            <Label className="mb-1 mt-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} className="mt-2 w-full" type="submit">
        {buttonText}
      </Button>
    </form>
  );
};

export default CommmonForm;
