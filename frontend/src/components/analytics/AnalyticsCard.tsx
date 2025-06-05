import { ReactNode } from 'react';

interface Props {
    title: string;
    content: string;
    icon: ReactNode;
    description: string;
    className?: string;
}

const AnalyticsCard = ({ title, content, icon, description, className }: Props) => {
    return (
        <div className="border bg-white border-gray-300 rounded-lg p-8 flex flex-col gap-6  shadow-sm">
            <div className="flex w-full">
                <div className="flex flex-col gap-2 flex-1">
                    <span className="font-medium text-gray-600">{title}</span>
                    <span className={`text-[1.75rem]  font-semibold flex-1 ${className}`}>
                        {content}
                    </span>
                </div>
                <span className={`${className}`}>{icon}</span>
            </div>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    );
};

export default AnalyticsCard;
