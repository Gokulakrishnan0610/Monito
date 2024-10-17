import { SlArrowRight } from "react-icons/sl";
import AdminDeatils from "./components/admin/AdminDetails"
import { useNavigate } from 'react-router-dom';


function Admin() {
    const navigate = useNavigate();

    const handleClickAdmin = () => {
        navigate('/AdminDetails');
    };
    const handleClickUser = () => {
        navigate('/UserDetails');
    };
    const handleClickProduct = () => {
        navigate('/Products');
    };
    const handleClickAdd = () => {
        navigate('/AddProducts');
    };
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <div className="bg-[#F7DBA7] text-left text-2xl h-fit flex flex-row items-center relative p-4 gap-x-4">
                <h1>Admin Details</h1>
                <button className="ml-auto">
                    <SlArrowRight onClick={handleClickAdmin} />
                </button>
            </div>

            <div className="bg-[#F7DBA7] text-left text-2xl h-fit flex flex-row items-center relative p-4">
                <h1>User Details</h1>
                <button className="ml-auto">
                    <SlArrowRight onClick={handleClickUser} />
                </button>
            </div>

            <div className="bg-[#F7DBA7] text-left text-2xl h-fit flex flex-row items-center relative p-4 md:gap-x-0">
                <h1>Product Details</h1>
                <button className="ml-auto">
                    <SlArrowRight onClick={handleClickProduct} />
                </button>
            </div>

            <div className="bg-[#F7DBA7] text-left text-2xl h-fit flex flex-row items-center relative p-4">
                <h1>Add Products</h1>
                <button className="ml-auto">
                    <SlArrowRight onClick={handleClickAdd} />
                </button>
            </div>
        </div>

    )
}

export default Admin