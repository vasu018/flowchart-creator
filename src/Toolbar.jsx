import Board from "./Board";
import EachTool from "./EachTool";
import { AllTools } from "./AllTools";
import { useEffect, useState } from "react";

const Toolbar = ({ data }) => {
    const [search, setSearch] = useState("");
    const [searchedTools, setSearchedTools] = useState(AllTools);

    useEffect(() => {
        if (search) {
            const matchingTools = AllTools.filter(tool => tool.name.toLowerCase().startsWith(search.toLowerCase()));
            // console.log(matchingTools);
            setSearchedTools(matchingTools)
        } else {
            setSearchedTools(AllTools);
        }
    }, [search]);

    return (
        <>
            <div className="flex lg:justify-between lg:flex-row flex-col sm:flex-start h-[100%]">
                <div className="lg:h-[70%] lg:mr-[5px] border-2 border-[#4f71be] ">
                    <div className="flex justify-center bg-[#4f71be] text-[#fff] border-b-2 border-black mb-[5px]">Abstractions</div>
                    <div className=" pr-[10px] pl-[10px] pb-[10px] lg:h-[100%]">
                        <div>
                            <input className=" border-2 border-black p-[5px] mb-[5px] h-[30px] rounded-md" placeholder="Search bar: Tasks" onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div className="flex lg:flex-col sm:flex-row text-center" style={{ overflow: "scroll", height: "calc(100% - 60px)" }}>
                            {searchedTools.length ? searchedTools.map((each, index) => (
                                <EachTool key={index} name={each.name} color={each.color} />
                            )) : <p>Enter valid input</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="w-[100%] h-[70%]" style={{ overflow: "hidden" }}>
                    <Board allowedDropEffect="copy" />
                </div>
            </div>

        </>
    );
};

export default Toolbar;