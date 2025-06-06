import { ProCon } from '../../types/proCon.types';
//import { useState } from 'react';

type Props = {
    items: ProCon[];
    title: string;
    color: 'green' | 'red';
};

const ProsConsTable = ({ items, title, color }: Props) => {
    //const [selectedItems, setSelectedItems] = useState<ProCon[]>([]);
    const bgColor = color === 'green' ? 'bg-green-50' : 'bg-red-50';

    //console.log('Items:', selectedItems);

    return (
        <div className={`${bgColor} p-4 rounded shadow flex-1 flex flex-col grow min-h-[300px]`}>
            <h2
                className={`text-xl font-semibold mb-2 ${color === 'green' ? 'text-green-800' : 'text-red-800'}`}>
                {title}
            </h2>
            {items.length > 0 ? (
                <div className=" h-full flex flex-col justify-between overflow-x-auto">
                    <table
                        className={`w-full  ${color === 'green' ? 'pros_table' : 'contras_table'}`}>
                        <thead>
                            <tr className={color === 'green' ? '!bg-green-800 ' : '!bg-red-800'}>
                                <th className="w-4/6 p-2 text-white text-center ">Nombre</th>
                                <th className="w-2/6 p-2 text-white text-center">Importancia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="text-center align-middle">
                                    <td className="p-2 truncate overflow-hidden whitespace-nowrap max-w-[200px]">
                                        {item.description}
                                    </td>
                                    <td className="p-2">{item.weight}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600">No hay ningún {title.toLowerCase()}</p>
            )}
        </div>
    );
};

export default ProsConsTable;
