
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

import React, { useEffect } from 'react';

const Dashboard = ({ user }) => {
  // useEffect para redirecionar o usuário caso não esteja autenticado
  useEffect(() => {
    // Verifica se o usuário não está autenticado
    if (!user || !user.isAuthenticated) {
      // Redireciona para a página de login
      window.location.href = '/componentes/login';
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <img
              src="/componentes/assets/imagens/dashboard1.png"
              className="img-fluid rounded mx-auto d-block shadow-lg"
              alt="Dashboard 1"
            />
            <img
              src="/componentes/assets/imagens/dashboard2.png"
              className="img-fluid rounded mx-auto d-block shadow-lg"
              alt="Dashboard 2"
            />
            <img
              src="/componentes/assets/imagens/dashboard3.png"
              className="img-fluid rounded mx-auto d-block shadow-lg"
              alt="Dashboard 3"
            />
            <img
              src="/componentes/assets/imagens/dashboard4.png"
              className="img-fluid rounded mx-auto d-block shadow-lg"
              alt="Dashboard 4"
            />
            <img
              src="/componentes/assets/imagens/dashboard5.png"
              className="img-fluid rounded mx-auto d-block shadow-lg"
              alt="Dashboard 5"
            />

            {!user.categorias && (
              <h1 className="text-center text-red-600 mt-6">
                Você não tem permissão sobre esse cômodo
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

