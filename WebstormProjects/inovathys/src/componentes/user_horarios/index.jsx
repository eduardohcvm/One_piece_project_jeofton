import React, { useState, useEffect } from 'react';

export default function DevicePage({ user, dispositivo }) {
  // Estado para armazenar os horários do dispositivo
  const [horarios, setHorarios] = useState(dispositivo.horario);

  useEffect(() => {
    if (!user.is_authenticated) {
      window.location.href = '/login';
    }
  }, [user]);

  // Função para remover um horário específico
  const handleRemoveHorario = (day, horario) => {
    setHorarios((prevHorarios) => {
      const updatedHorarios = { ...prevHorarios };
      delete updatedHorarios[day][horario]; 

      if (Object.keys(updatedHorarios[day]).length === 0) {
        delete updatedHorarios[day];
      }

      return updatedHorarios;
    });

  };

  if (!user.is_authenticated) return null;

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white shadow-lg rounded-lg text-gray-800">
            <div className="bg-blue-800 text-white text-center py-4 rounded-t-lg">
              <h2 className="text-2xl font-medium">{dispositivo.nome}</h2>
            </div>
            <div className="p-6">
              {/* Mapeia os dias e horários para exibição */}
              {Object.keys(horarios).map((day) => (
                <div key={day}>
                  {Object.entries(horarios[day]).map(([horario, valor]) => (
                    <li key={horario} className="flex justify-between items-center py-1">
                      <span>
                        {day} às {horario}: {valor ? 'Ligar' : 'Desligar'}
                      </span>
                      {/* Botão para remover o horário */}
                      <button
                        onClick={() => handleRemoveHorario(day, horario)}
                        className="text-blue-600 underline"
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </div>
              ))}
            </div>
            <div className="text-center py-3">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => window.location.href = `/updatehorario/${dispositivo.id}`}
              >
                Adicionar Timer
              </button>
            </div>
            <div className="bg-blue-800 text-center py-3 rounded-b-lg">
              <small className="text-white">© 2024 Inovathys</small>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
