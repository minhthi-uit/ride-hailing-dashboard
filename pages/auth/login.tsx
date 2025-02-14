import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', { ...credentials, redirect: true, callbackUrl: '/' });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleLogin}>
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mb-2"
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
      </form>
    </div>
  );
}
