import { ChangeEvent, useState } from 'react';

type Props = {
    name: string;
    label: string;
    placeholder?: string;
};

const InputFile = ({ name }: Props) => {
    const [image, setImage] = useState<string>('/person.svg');
    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <img
                src={image ? image : '/person.svg'}
                alt="Avatar"
                className="rounded-full h-[70px] w-[70px] object-cover border border-gray-200"
            />
            <label
                htmlFor={name}
                className="cursor-pointer border border-gray-300 grow px-4 py-2 rounded text-sm">
                Seleccionar archivo
            </label>
            <input
                type="file"
                name={name}
                id={name}
                accept="image/*"
                className="hidden"
                onChange={handleImage}
            />
        </div>
    );
};

export default InputFile;
