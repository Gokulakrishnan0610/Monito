import frame from "../images/Frame.png"
import rectangle from "../images/Rectangle.png"
import search from "../images/Search.png"
import star from "../images/Star.png"
import vector from "../images/Vector.png"
import bsearch from "../images/BlackSearch.png"
import mrectangel from "../images/MRectangle.png"
import arrow from "../images/Arrow.png"
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (

        <div>
            <div className="bg-[#FCEED5] h-[635px] sm:h-[695px] rounded-br-[20px] sm:rounded-br-[30px] lg:rounded-br-[40px] rounded-bl-[20px] sm:rounded-bl-[30px] lg:rounded-bl-[40px] relative">
                <img src={rectangle} alt="rectangle" className="absolute top-0 left-0 z-0 hidden sm:flex sm:left-[-100px] xl:left-0"  />
                <img src={mrectangel} alt="" className="sm:hidden" />
                <div className="flex flex-row gap-[48px] py-7 px-[130px] top-0 xl:relative">
                    <img src={frame} alt="frame" className="z-10 absolute top-[40px] sm:relative sm:top-0  w-[100px] mt-5 sm:mt-0 sm:w-32 ml-7 sm:ml-0 sm:left-[-80px] xl:left-0"  />
                    <img src={vector} alt="" className="w-4 h-4 absolute top-[65px] left-3 z-10 sm:hidden"   />
                    <img src={bsearch} alt="" className="w-4 h-4 z-10 absolute top-[65px] right-3 sm:hidden" />
                    <div className="flex flex-row gap-5 xl:gap-12 text-[#003459] text-base font-bold font-gilroy mt-3 hidden sm:flex sm:absolute sm:left-[200px] xl:left-0">
                        <p><Link to="/">Homee</Link></p>
                        <p>Category</p>
                        <p>About</p>
                        <p>Contact</p>
                        <p>Admin</p>
                    </div>
                    <div className="flex flex-row gap-[14px] hidden sm:flex xl:relative">
                        <div className="flex flex-row lg:items-center rounded-[46px] bg-white py-3 pr-5 pl-4 gap-3 hidden lg:flex absolute right-[230px] ">
                            <img src={search} alt="search" className="h-5 w-5" />
                            <h1 className="text-[#99A2A5] text-sm font-medium font-gilroy">
                                Search something here!
                            </h1>
                        </div>
                        <div className="rounded-[57px] bg-[#003459] pt-[14px] px-4 lg:px-7 pb-[10px] gap-[10px] absolute right-2 lg:text-center">
                            <h1 className="text-white text-base font-bold font-gilroy" >Join the community</h1>
                        </div>
                        <div className="pt-[10px] pr-[8px] pb-[8px] pl-[8px] gap-[4px] hidden xl:flex">
                            <div className="flex flex-row gap-[6px]">
                                <img src={star} alt="Star" />
                                <h1 className="text-[#002A48] text-base">VND</h1>
                                <div className=" mt-[11px] ml-[9px]" >
                                    <img src={arrow} alt="vector" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Navbar