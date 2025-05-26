import { ProCon } from '../../types/proCon.types';

type Props = {
    items: ProCon[];
    title: string;
    color: 'green' | 'red';
};

const ProsConsTable = ({ items, title, color }: Props) => {
    const bgColor = color === 'green' ? 'bg-green-50' : 'bg-red-50';

    return (
        <div className={`${bgColor} p-4 rounded shadow flex-1 flex flex-col grow`}>
            <h2
                className={`text-xl font-semibold mb-2 ${color === 'green' ? 'text-green-800' : 'text-red-800'}`}>
                {title}
            </h2>
            {items.length > 0 ? (
                <table
                    className={`w-full text-left border-collapse flex flex-col ${color === 'green' ? 'pros_table' : 'contras_table'}`}>
                    <thead>
                        <tr
                            className={`flex ${color === 'green' ? '!bg-green-800' : '!bg-red-800'} rounded-t text-white w-full`}>
                            <th className="p-2 text-left flex-2">Nombre</th>
                            <th className="p-2 text-left flex-1">Importancia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr className="flex flex-1" key={item.id}>
                                <td className="p-2 text-left flex-2 ">{item.description}</td>
                                <td className="p-2 flex-1 text-center">{item.weight}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">No hay ningún {title.toLowerCase()}</p>
            )}
        </div>
    );
};

export default ProsConsTable;
