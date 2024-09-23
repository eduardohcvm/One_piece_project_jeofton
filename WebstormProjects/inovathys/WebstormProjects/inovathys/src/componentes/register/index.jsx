import styles from "./scroll.module.css"
import React, { useState } from 'react';
import axios from 'axios';


function RegisterForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [nonFieldErrors, setNonFieldErrors] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/register/', formData);
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data.errors || {});
                setNonFieldErrors(error.response.data.non_field_errors || '');
            }
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 ">
                <div className="flex justify-center ">
                    <div className="w-full max-w-md bg-blue-500 pt-12 rounded-lg shadow-2xl">
                        <div className="bg-white p-8">
                            <div className="text-center mb-4">
                                <h1 className="text-2xl font-semibold ">Registre-se agora!</h1>
                                <hr className="my-4" />
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-sm font-bold text-gray-700">
                                        Usuário
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder='Digite seu nome de usuário'
                                        value={formData.username}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.username ? 'border-red-500' : ''}`}
                                    />
                                    {errors.username && (
                                        <p className="text-red-500 text-sm mt-2">{errors.username}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="category" className="block text-sm font-bold text-gray-700">
                                        Categoria
                                    </label>
                                    <select name="category" id="category" className={`${styles.customScroll} mt-2 w-full block border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2`} size="4">
                                        <option value="prof01" selected>Professor-Lab01</option>
                                        <option value="prof02">Professor-Lab02</option>
                                        <option value="prof03">Professor-Lab03</option>
                                        <option value="reitor">Reitor</option>
                                        <option value="aluno">Aluno</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                                        Senha
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder='Digite sua senha'
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-2">{errors.password}</p>
                                    )}
                                </div>

                                {nonFieldErrors && (
                                    <div className="alert alert-danger">
                                        <p className="text-red-500 text-sm">{nonFieldErrors}</p>
                                    </div>
                                )}

                                <div className="form-content">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                                    >
                                        Criar
                                    </button>
                                </div>
                            </form>

                        </div>
                        <div className="flex items-center justify-center text-white h-16 shadow-2xl"> 
                        <p>© 2024 Inovathys</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </main>
    );
}

export default RegisterForm;
