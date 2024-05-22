
import clsx from 'clsx';

type CellProps = {
    children: React.ReactNode;
    selected: boolean;
    onClick: () => void;
};

function Cell({children, selected=false, onClick}: CellProps) {
    return (
        <div 
            // className="cell flex flex-row justify-center items-center"
            className={clsx(
                "cell flex flex-row justify-center items-center w-12 h-12  border-solid",
                {
                    "text-blue-700 border-2 border-blue-700 bg-zinc-800": selected,
                    "text-red-600 border border-white bg-black": !selected,
                    
                }
            )}
            onClick={onClick}
        >
            {children ? children : <span>&nbsp;</span>}
        </div>
    )
}

export default Cell