import { Control, Controller, FieldError, FieldValues } from 'react-hook-form';

type Props<T extends FieldValues> = {
    name: keyof T;
    control: Control<T>;
    type?: string;
    label: string;
    placeholder?: string;
    error?: FieldError;
    disabled?: boolean;
};

const Input = <T extends FieldValues>({
    name,
    type = 'text',
    label,
    placeholder,
    control,
    error,
}: Props<T>) => {
    return (
        <div className="flex flex-col gap-2 flex-1">
            <label htmlFor={String(name)} className="font-medium">
                {label}
            </label>

            <Controller
                control={control}
                name={name as any}
                render={({ field }) => (
                    <input
                        type={type}
                        placeholder={placeholder}
                        {...field}
                        className="border border-gray-300 rounded px-3 py-2"
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
