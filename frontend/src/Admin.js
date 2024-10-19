import { SlArrowRight } from "react-icons/sl";
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
    const handleAddAnimals = () => {
        navigate('/addanimals');
    };
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Admin Panel</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="bg-[#F7DBA7] text-left text-2xl h-fit flex flex-row items-center relative p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <h1>Admin Details</h1>
                    <button className="ml-auto">
                        <SlArrowRight onClick={handleClickAdmin} className="text-3xl hover:text-gray-700 transition-colors duration-300" />
                    </button>
                </div>

                <div className="bg-[#F7DBA7] text-left text-2xl h-fit flex flex-row items-center relative p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <h1>User Details</h1>
                    <button className="ml-auto">
                        <SlArrowRight onClick={handleClickUser} className="text-3xl hover:text-gray-700 transition-colors duration-300" />
                    </button>
                </div>

                <div className="bg-[#F7DBA7] text-left text-2xl h-fit flex flex-row items-center relative p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <h1>Product Details</h1>
                    <button className="ml-auto">
                        <SlArrowRight onClick={handleClickProduct} className="text-3xl hover:text-gray-700 transition-colors duration-300" />
                    </button>
                </div>

                <div className="bg-[#F7DBA7] text-left text-2xl h-fit flex flex-row items-center relative p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <h1>Add Animals</h1>
                    <button className="ml-auto">
                        <SlArrowRight onClick={handleAddAnimals} className="text-3xl hover:text-gray-700 transition-colors duration-300" />
                    </button>
                </div>
                <div className="bg-[#F7DBA7] text-left text-2xl h-fit flex flex-row items-center relative p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <h1>Add Animal Product</h1>
                    <button className="ml-auto">
                        <SlArrowRight onClick={ handleClickAdd } className="text-3xl hover:text-gray-700 transition-colors duration-300" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Admin