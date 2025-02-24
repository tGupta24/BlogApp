


function Creators() {
    return (
        <div className="flex flex-wrap justify-center items-center my-20 bg-gray-100">

            <div

                className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full m-2"
            >
                <div className="relative">
                    <img

                        alt="avatar"
                        className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
                        <img

                            alt="avatar"
                            className="w-16 h-16 rounded-full mx-auto border-4 border-gray-700"
                        />
                    </div>
                </div>
                <div className="px-4 py-6 mt-4">
                    <h2 className="text-center text-xl font-semibold text-gray-800">

                    </h2>
                    <p className="text-center text-gray-600 mt-2"></p>
                    <p className="text-center text-gray-600 mt-2"></p>
                    <p className="text-center text-gray-600 mt-2"></p>
                </div>
            </div>

        </div>
    )
}

export default Creators;