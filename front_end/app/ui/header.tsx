


function Header() {
    return (
        <div className="flex flex-row justify-between">
            <div className="text-3xl ml-5">Sudoku Solver</div>
            <div className="flex flex-row justify-between items-center">
                <a href="https://github.com/kk-mbugua/sudoku" target="_blank" rel="noopener noreferrer" className="mr-5">Github</a>
                <button className="mr-10">Report bug</button>
            </div>

        </div>
    )
}

export default Header