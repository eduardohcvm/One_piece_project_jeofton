import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Dependência do carrossel
import 'tailwindcss/tailwind.css'; // Certifique-se de ter configurado o Tailwind no projeto

const Home = () => {
    const [carouselItems] = useState([
        {
            id: 1,
            image: 'images/produto_1.jpg',
            alt: 'Casa automatizada',
        },
        {
            id: 2,
            image: "images/produto_2.jpg",
            alt: 'Monitoramento',
        },
        {
            id: 3,
            image: 'images/produto_3.jpg',
            alt: 'Hardware de controle de energia',
        },
    ]);

    return (
        <main className="bg-gray-100 text-gray-900">

            {/* Yuri = adicionei uma Seção de Cabeçalho para(user_dispositivos, user_horario e user_info) Falta só a implementação das rotas*/}
            <header className="container mx-auto text-center py-4 bg-gray-800"> 
                <nav className="mt-2 space-x-4">
                    <a href="/page/user_info" className="inline-block px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition">
                        Dashboard
                    </a>
                    <a href="/page/user_info_2" className="inline-block px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition">
                        Horários
                    </a>
                    <a href="/page/user_dispositivo" className="inline-block px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition">
                        Dispositivos
                    </a>
                </nav>
            </header>

            {/* Seção de Introdução */}
            <section className="py-10 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4 shadow-md">
                    Soluções Inteligentes para Economia de Energia
                </h1>
                <h3 className="text-2xl">Nossa energia é a sua economia</h3>
                <p className="mt-4 text-gray-600">
                    Já imaginou economizar mais que gastar? Isso mesmo, o objetivo da
                    Inovathys é fazer você economizar energia de forma eficiente.
                </p>
                <button className="mt-6 px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition">
                    Comece a economizar
                </button>
            </section>

            {/* Carrossel de Produtos */}
            <section className="container mx-auto px-4 py-8 max-w-72">
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop
                    autoPlay
                    interval={9000}
                    className="shadow-lg rounded-lg overflow-hidden"
                >
                    {carouselItems.map((item) => (
                        <div key={item.id}>
                            <img src={item.image} alt={item.alt} className="object-cover" />
                        </div>
                    ))}
                </Carousel>
            </section>

            {/* Seção de Informações sobre a Empresa */}
            <section className="py-10 bg-gray-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center mb-8">
                        Por que escolher a Inovathys?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-white rounded-lg shadow">
                            <h4 className="text-xl font-bold mb-4">Inovação Constante</h4>
                            <p className="text-gray-600">
                                Estamos sempre na vanguarda das últimas tendências tecnológicas.
                            </p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow">
                            <h4 className="text-xl font-bold mb-4">Foco no Cliente</h4>
                            <p className="text-gray-600">
                                Colocamos as necessidades de nossos clientes no centro de tudo
                                que fazemos.
                            </p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow">
                            <h4 className="text-xl font-bold mb-4">Equipe Especializada</h4>
                            <p className="text-gray-600">
                                Nossa equipe é formada por profissionais altamente qualificados
                                e experientes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção de Planos */}
            <section className="py-10 text-center bg-gray-50">
                <h2 className="text-3xl font-semibold mb-6">Conheça Agora Nossos Planos!</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                    Oferecemos uma variedade de planos personalizados para atender às suas
                    necessidades específicas de economia de energia, proporcionando máxima
                    eficiência e economia.
                </p>
                <button className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition">
                    Comece a Economizar
                </button>
            </section>

            {/* Seção de Conquistas */}
            <section className="py-10 bg-gray-200">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl text-center font-semibold mb-6">Nossas Conquistas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="p-6 bg-white rounded-lg shadow text-center">
                            <img
                                src="images/icon-mose.png"
                                alt="Certificação MOSE"
                                className="w-24 h-24 mx-auto mb-4"
                            />
                            <h5 className="text-xl font-bold">MOSE Comp</h5>
                            <p className="text-gray-600">Certificação internacional MOSE nível bronze.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow text-center">
                            <img
                                src="images/icon-senai.png"
                                alt="Senai"
                                className="w-24 h-24 mx-auto mb-4"
                            />
                            <h5 className="text-xl font-bold">Senai</h5>
                            <p className="text-gray-600">Aprovados no Edital de Inovação para a Indústria.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow text-center">
                            <img
                                src="images/img-abstartups.png"
                                alt="ABStartups"
                                className="w-24 h-24 mx-auto mb-4"
                            />
                            <h5 className="text-xl font-bold">ABStartups</h5>
                            <p className="text-gray-600">CASE de sucesso pela ABStartups 2019.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow text-center">
                            <img
                                src="images/icon-nordeste.png"
                                alt="Nordestina"
                                className="w-24 h-24 mx-auto mb-4"
                            />
                            <h5 className="text-xl font-bold">Empresa Nordestina</h5>
                            <p className="text-gray-600">
                                Orgulho de ser uma empresa nordestina com sede em João Pessoa - PB.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
