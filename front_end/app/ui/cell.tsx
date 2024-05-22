
import clsx from 'clsx';

type CellProps = {
    children: React.ReactNode;
    isPreFilled: boolean;
    selected: boolean;
    onClick: () => void;
};

function Cell({children, isPreFilled, selected=false, onClick}: CellProps) {
    return (
        <div 
            // className="cell flex flex-row justify-center items-center"
            className={clsx(
                "cell flex flex-row justify-center items-center w-12 h-12  border-solid",
                {
                    "text-red-300 border border-white bg-zinc-950": isPreFilled && !selected,
                    "text-red-300 border-2 border-blue-700 bg-zinc-950": isPreFilled && selected,
                    "text-red-600 border border-white bg-zinc-900": !isPreFilled && !selected,
                    "text-blue-700 border-2 border-blue-700 bg-zinc-700": !isPreFilled && selected,
                }
            )}
            onClick={onClick}
        >
            {children ? children : <span>&nbsp;</span>}
        </div>
    )
}

export default Cell