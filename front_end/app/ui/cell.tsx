import clsx from 'clsx';

type CellProps = {
    children: React.ReactNode;
    isPreFilled: boolean;
    selected: boolean;
    hasError: boolean;
    onSelect: () => void;
};

function Cell({children, isPreFilled, selected=false, hasError, onSelect}: CellProps) {
    return (
        <div 
            className={clsx(
                "cell flex flex-row justify-center items-center w-12 h-12 border-solid",
                {
                    "text-gray-800 border-gray-300 bg-white": !isPreFilled && !selected, // Default cell style
                    "text-gray-800 border-gray-300 bg-gray-200": isPreFilled && !selected, // Pre-filled cell style
                    "text-gray-800 border-2 border-blue-500 bg-gray-200": isPreFilled && selected, // Pre-filled selected cell
                    "text-gray-800 border-2 border-blue-500 bg-white": !isPreFilled && selected, // Selected cell style
                    "border-red-600": hasError
                }
            )}
            onClick={onSelect}
        >
            {children ? children : <span>&nbsp;</span>}
        </div>
    )
}

export default Cell;
