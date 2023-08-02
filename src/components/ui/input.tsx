interface InputProps {
  type: string
  label: string
  id: string
  className?: string
  required: boolean
  placeholder: string
  value: string | number
  onChange(e: string | number): void
}

function Input({ className, onChange, label, ...props }: InputProps) {
  return (
    <>
      <label htmlFor={props.id} className='block mb-2 font-medium '>
        {label}
      </label>
      <input
        onChange={(e) => onChange(e.target.value)}
        className={`bg-primary-dark-blue text-primary-grey border border-primary-blue placeholder:text-primary-grey text-sm rounded-lg  focus:border-primary-light-blue block w-full p-2.5 ${className}`}
        {...props}
      />
    </>
  )
}

export default Input
