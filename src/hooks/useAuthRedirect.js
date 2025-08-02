import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    // Verifica se o token está na localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      // Redireciona para o login se não houver token
      router.replace('/'); 
    }
  }, [router]);
};

export default useAuthGuard;
