'use client';

import Header from "../common/Header";
import SearchBar from "../common/SearchBar";
import { BsThreeDotsVertical, BsSearch } from 'react-icons/bs';
import { BiSolidMessageAdd } from 'react-icons/bi';
import Contact from "./Contact";
import ContactImage from "../common/ContactImage";
import { useState, Dispatch, SetStateAction, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { atomUIState } from "@/state-manager/atoms";

const Menu: React.FC = () => {
    const [uiState, setUIState] = useRecoilState(atomUIState);

    return (
        <div className="flex flex-col w-full h-full bg-menuBg">
            <Header>
                <div className="w-full flex justify-between items-center">
                    <ContactImage className="hidden md:block" />
                    <div className=" md:hidden font-bold">
                        QuickConverse
                    </div>
                </div>
                <div className="flex space-x-5 items-center text-iconLight">
                    <button className="md:hidden">
                        <BsSearch className="text-lg font-bold" />
                    </button>
                    <button className="hidden md:block">
                        <BiSolidMessageAdd className="text-2xl font-bold" />
                    </button>
                    <button>
                        <BsThreeDotsVertical className="text-lg font-bold" />
                    </button>
                </div>
            </Header>
            <div className="hidden w-full md:block">
                <SearchBar />
            </div>
            <div className="custom-scrollbar flex flex-col overflow-y-scroll w-full">
                {
                    // dummyList.map(item => {
                    //     return <Contact
                    //         currentId={uiState.activeContactId}
                    //         id={item.id}
                    //         key={item.id}
                    //         name={item.name}
                    //         logo={item.logo}
                    //         date={item.date}
                    //         lastMessage={item.lastMessage}
                    //     />
                    // })
                }
            </div>
        </div>
    );
}

export default Menu;