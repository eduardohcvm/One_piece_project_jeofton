import React, { useState, useEffect } from 'react';

export default function Room({ user, comodo }) {
  // Estado para armazenar a lista de dispositivos
  const [dispositivos, setDispositivos] = useState([]);

  // useEffect para verificar autenticação do usuário e simular dados dos dispositivos (falta colocar a API)
  useEffect(() => {
    if (!user.is_authenticated) {
      window.location.href = '/login';
    } else if (user.categorias) {
      setDispositivos([
        { id: 1, nome: 'Dispositivo 1' },
        { id: 2, nome: 'Dispositivo 2' },
      ]);
    }
  }, [user]); 

  if (!user.is_authenticated) return null;

  return user.categorias ? (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white shadow-lg rounded-lg mt-10">
            <div className="bg-gray-800 text-white text-center py-4 rounded-t-lg">
              <h3 className="text-xl font-light">{comodo.nome}</h3>
            </div>
            <div className="p-6">
              <div className="text-center mb-4">
                <h5 className="text-lg font-medium">Dispositivos do {comodo.nome}</h5>
                <hr className="my-4" />
              </div>
              <div className="overflow-x-auto">
                {/* tabela para listar os dispositivos */}
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Nome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dispositivos.map((dispositivo) => (
                      <tr key={dispositivo.id} className="hover:bg-gray-200">
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => window.location.href = `/areadispositivo/${dispositivo.id}`}
                            className="text-blue-600 underline"
                          >
                            {dispositivo.id}
                          </button>
                        </td>
                        <td className="border px-4 py-2">{dispositivo.nome}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  ) : (
    <div className="text-center mt-10">
      <h1 className="text-red-600">Você não tem permissão sobre esse cômodo</h1>
    </div>
  );
}
