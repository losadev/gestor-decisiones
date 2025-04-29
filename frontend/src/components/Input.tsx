import { Control, Controller, FieldError } from 'react-hook-form';
import { FormRegisterValues } from '../schemas/register.schema';

type Props = {
    name: keyof FormRegisterValues;
    control: Control<FormRegisterValues>;
    type?: string;
    label: string;
    placeholder?: string;
    error?: FieldError;
};

const Input = ({ name, type, label, placeholder, control, error }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="font-medium">
                {label}
            </label>

            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <input
                        type={type}
                        placeholder={placeholder}
                        {...field}
                        className="border border-gray-300 rounded px-3 py-2"
                        value={field.value ?? ''}
                    />
                )}
            />
            <div
                className={`min-h-[1.25rem] text-sm text-red-700 transition-opacity duration-200 ease-in-out ${
                    error ? 'opacity-100' : 'opacity-0'
                }`}>
                {error?.message || '\u00A0'}
            </div>
        </div>
    );
};

export default Input;
