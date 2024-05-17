
function Cell({value}: {value: number|undefined}) {

    return (
        <div className="cell">
            {value ? value : "6"}
        </div>
    )
}

export default Cell