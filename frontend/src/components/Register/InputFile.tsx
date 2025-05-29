import { ChangeEvent, useState } from 'react';
import { ControllerRenderProps, UseControllerProps, useController } from 'react-hook-form';

type Props = UseControllerProps<any> & {
    label: string;
};

const InputFile = ({ name, control, label }: Props) => {
    const {
        field: { onChange, value, ref },
    } = useController({
        name,
        control,
    });

    const [image, setImage] = useState<string>('/person.svg');

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            onChange(e.target.files); // ← esto pasa el FileList al formulario
        }
    };

    return (
        <div className="flex items-center gap-4">
            <img
                src={image || '/person.svg'}
                alt="Avatar"
                className="rounded-full h-[70px] w-[70px] object-cover border border-gray-200"
            />
            <label
                htmlFor={name}
                className="cursor-pointer border border-gray-300 grow px-4 py-2 rounded text-sm">
                {label}
            </label>
            <input
                type="file"
                name={name}
                id={name}
                accept="image/*"
                className="hidden"
                onChange={handleImage}
                ref={ref}
            />
        </div>
    );
};

export default InputFile;
