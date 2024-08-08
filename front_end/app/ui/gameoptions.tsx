"use client";

import { Difficulty } from '../lib/definitions';
import { Fragment } from 'react'
import { Menu, MenuItems, MenuItem, MenuButton, Transition } from '@headlessui/react'
import { ChevronDownIcon, ServerStackIcon } from '@heroicons/react/20/solid'

const menuItemClassName = "flex flex-row justify-start items-center";

type GameOptionsProps = {
    newGame: (difficulty: Difficulty) => void,
    createBoard: () => void
}
function GameOptions({ newGame, createBoard }: GameOptionsProps) {

    return (
        <div className=''>
            <Menu as="div" className="relative inline-block text-left pr-10">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-secondary">
                    New Game
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </MenuButton>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <span>Generate board</span>
                        <MenuItem>
                            <div className={menuItemClassName}>
                                <ServerStackIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <button
                                    type="button"
                                    className='text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-primary'
                                    style={{"color": "black"}}
                                    onClick={() => newGame("easy")}
                                >
                                    Easy
                                </button>

                            </div>
                        </MenuItem>
                        <MenuItem>
                            <div className={menuItemClassName}>
                                <ServerStackIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <button
                                    type="button"
                                    className='text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-primary'
                                    style={{"color": "black"}}
                                    onClick={() => newGame("medium")}
                                >
                                    Medium
                                </button>

                            </div>
                        </MenuItem>
                        <MenuItem>
                            <div className={menuItemClassName}>
                                <ServerStackIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <button
                                    type="button"
                                    className='text-gray-700block w-full px-4 py-2 text-left text-sm hover:bg-primary'
                                    style={{"color": "black"}}
                                    onClick={() => newGame("hard")}
                                >
                                    Hard
                                </button>

                            </div>
                        </MenuItem>
                        <div className="my-2 h-px bg-black/5" />
                        <span>Create your board</span>
                        <MenuItem>
                            <div className={menuItemClassName}>
                                <ServerStackIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <button
                                    type="button"
                                    className='text-gray-700block w-full px-4 py-2 text-left text-sm'
                                    style={{"color": "black"}}
                                    onClick={()=> createBoard()}
                                >
                                    Set Board
                                </button>

                            </div>
                        </MenuItem>
                    </div>
                </MenuItems>

            </Transition>
            </Menu>
        </div>
    )
}

export default GameOptions
