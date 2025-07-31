
import clx from "classnames";

const Input = (props) => {
    return <input
    
    className={clx(" text-black mt-1 w-full h-14 border border-[#dcdee3] bg-[#eff3f6] px-3 py-2 rounded-[99px] focus:outline-none focus:ring-2 focus:ring-blue-500", props?.className)}
    //className="input input-bordered"
    {
        ...props
    }
  />
}

export default Input;