function FormTeste() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="container flex flex-col mx-auto px-4">
                <div className="flex justify-center">
                    <div className="w-full max-w-md p-0 rounded-lg shadow-2xl">
                        <div className="bg-blue-500 text-white text-center text-2xl font-semibold w-full h-20 flex items-center justify-center">
                            <h1>Categoria</h1>
                        </div>
                        <div className="p-8 bg-white">
                            <form className="space-y-4">
                                <div className="mb-4">
                                    <label htmlFor="categoria" className="block text-sm font-bold text-gray-700">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        id="categoria"
                                        name="categoria"
                                        placeholder="Digite o nome da categoria"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="convenient" className="block text-sm font-bold text-gray-700">
                                        Cômodos
                                    </label>
                                    <select
                                        name="convenient"
                                        id="convenient"
                                        size="6"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >

                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                                >
                                    Criar
                                </button>
                            </form>
                        </div>
                        <div className="flex items-center justify-center text-white h-16 shadow-2xl bg-blue-500">
                            <p>© 2024 Inovathys</p>
                        </div>
                    </div>


                </div>
            </div>
        </main>


    );
}



export default FormTeste