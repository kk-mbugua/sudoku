
function Cell({value}: {value: number|undefined}) {
    return (
        <div className="cell flex flex-row justify-center items-center">
            {value ? value : ""}
        </div>
    )
}

export default Cell