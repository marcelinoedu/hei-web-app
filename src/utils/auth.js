// ============================================
// FUNÇÕES UTILITÁRIAS DE AUTENTICAÇÃO
// ============================================

/**
 * Obtém o token armazenado no localStorage
 * @returns {string|null} Token ou null se não existir
 */
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

/**
 * Salva o token no localStorage
 * @param {string} token - Token a ser salvo
 */
export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
    // Também salva em cookie para o middleware acessar
    document.cookie = `authToken=${token}; path=/; max-age=86400; SameSite=Lax`;
  }
};

/**
 * Remove o token do localStorage e cookie (logout)
 */
export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    // Remove cookie também
    document.cookie = 'authToken=; path=/; max-age=0; SameSite=Lax';
  }
};

/**
 * Verifica se o usuário está autenticado
 * @returns {boolean} true se tem token, false caso contrário
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Retorna headers com autenticação para requisições
 * @returns {Object} Objeto com headers incluindo Authorization se tiver token
 */
export const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': token } : {})
  };
};

/**
 * Trata erros de API, especialmente 401 (Unauthorized)
 * @param {Response} response - Resposta do fetch
 * @param {Object} router - Router do Next.js (opcional)
 * @returns {Promise<Response>} Resposta se não houver erro 401
 * @throws {Error} Se houver erro 401 ou outro erro
 */
export const handleApiError = async (response, router = null) => {
  if (response.status === 401) {
    // Token inválido/expirado
    removeToken();
    
    if (router) {
      const currentPath = router.asPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
      router.push(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
    } else if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      window.location.href = `/auth/login?redirect=${encodeURIComponent(currentPath)}`;
    }
    
    throw new Error('Sessão expirada. Por favor, faça login novamente.');
  }
  
  // Outros erros
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Erro ${response.status}`);
  }
  
  return response;
};

/**
 * Faz logout do usuário
 * @param {Object} router - Router do Next.js (opcional)
 */
export const logout = (router = null) => {
  removeToken();
  if (router) {
    router.push('/auth/login');
  } else if (typeof window !== 'undefined') {
    window.location.href = '/auth/login';
  }
};

/**
 * Faz login no backend
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise<string>} Token retornado pelo backend
 * @throws {Error} Se credenciais inválidas ou erro na requisição
 */
export const login = async (email, password) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // Se resposta não foi ok (status diferente de 200-299)
    if (!response.ok) {
      // Tenta ler mensagem de erro do backend
      const errorText = await response.text();
      throw new Error(errorText || 'Erro ao fazer login');
    }

    // Backend retorna token como String (não JSON)
    const token = await response.text();
    
    // Salva token no localStorage e cookie
    setToken(token);
    
    return token;
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};

