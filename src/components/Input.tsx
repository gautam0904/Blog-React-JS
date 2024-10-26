import React , {useId} from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string; // Add label prop
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
    {
        label ,
        type ="text",
        className ="",
        ...props
    },ref
) {
    const id = useId();
  return (
    <div className='w-full'>
        {
            label && <label className='mb-1 pl-1 inline-block' htmlFor={id}>{label}</label>
        }
        <input
            ref={ref}
            type={type}
            className= {`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-400 duration-200 border border-gray-900 w-full ${className} `}
            {...props}
            id={id}
        />
    </div>
  )
})

export default Input