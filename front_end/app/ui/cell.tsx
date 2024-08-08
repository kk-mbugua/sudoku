import clsx from 'clsx';

type CellProps = {
    children: React.ReactNode;
    isPreFilled: boolean;
    isSelected: boolean;
    hasError: boolean;
    onCellClick: () => void;
};

function Cell({children, isPreFilled, isSelected=false, hasError, onCellClick}: CellProps) {
    return (
        <div 
            className={clsx(
                "cell flex flex-row justify-center items-center w-12 h-12 border-solid text-gray-800",
                {
                    "bg-gray-200": isPreFilled, // Pre-filled cell style
                    "bg-white": !isPreFilled, // User-filled cell style
                    "border-secondary border-2 text-secondary": isSelected, // Selected cell style
                    "border-red-600 border": hasError, // cell with error
                }
            )}
            onClick={onCellClick}
        >
            {children ? children : <span>&nbsp;</span>}

        </div>
    )
}

export default Cell;
