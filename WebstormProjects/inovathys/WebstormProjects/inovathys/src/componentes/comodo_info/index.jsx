import React, {useEffect} from "react";

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
