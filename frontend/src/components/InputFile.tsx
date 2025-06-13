import { ChangeEvent, useState } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';

type Props = UseControllerProps<any> & {
    label: string;
};

const InputFile = ({ name, control, label }: Props) => {
    const {
        field: { onChange, ref }, // Extrae las funciones onChange y ref del objeto 'field' que devuelve useController
    } = useController({
        name, // Nombre del campo de formulario, usado para identificarlo en react-hook-form
        control, // Control del formulario que maneja el estado y validación (viene del hook useForm)
    });

    const [image, setImage] = useState<string>('/person.svg'); // Estado local para guardar la URL de la imagen que se mostrará, inicia con una imagen por defecto

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        // Función que se ejecuta cuando cambia el input file (cuando se selecciona un archivo)
        const file = e.target.files?.[0]; // Obtiene el primer archivo seleccionado del input (si existe)
        if (file) {
            // Si hay un archivo seleccionado
            const imageUrl = URL.createObjectURL(file); // Crea una URL temporal para mostrar la imagen seleccionada en el navegador
            setImage(imageUrl); // Actualiza el estado local con la URL para que se muestre la imagen
            onChange(e.target.files); // Actualiza el formulario con el objeto FileList para que react-hook-form lo registre

        field: { onChange, ref },
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
