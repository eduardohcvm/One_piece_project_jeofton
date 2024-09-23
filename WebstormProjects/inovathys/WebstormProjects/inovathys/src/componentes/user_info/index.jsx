
function UserInfo() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="container flex flex-col mx-auto px-4 " >
                <div className="flex justify-center rounded-3xl">
                    <div className="w-full max-w-md p-0 rounded-3xl">
                        <div className="bg-zinc-800 text-white text-center text-2xl font-semibold w-full h-20 flex items-center justify-center ">
                            <h1>admin</h1>
                        </div>
                        <div className="p-8 bg-white">
                            <h2 className="font-bold border-b border-solid border-b-2 w-[100%] -my-8 p-4">Informações do usuário</h2>
                        </div>
                        <div className="flex flex-col items-start justify-start m-3 font-bold">
                            <p>Email: </p>
                            <p>Categoria:</p>
                        </div>
                        <table className="flex items-center justify-start shadow-2xl ">
                            <thead className="gap-x-10 border-b border-solid border-b-1"> 
                                <th className="px-8">ID</th>    
                                <th className="px-8">Lugar</th> 
                                <th className="8">Nome</th>  
                            </thead>
                        </table>



                        <div className="flex items-center justify-center text-white h-16 shadow-2xl border-t border-solid border-t-2 ">
                            <button className="text-white bg-red-500 p-2 w-20 rounded-xl">LogOut</button>
                        </div>
                    </div>


                </div>
            </div>
        </main>
    )
}
export default UserInfo




