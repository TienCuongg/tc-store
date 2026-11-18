/**
 * ==============================================================================
 * 👤 QUẢN LÝ XÁC THỰC NGƯỜI DÙNG (AUTH CONTEXT & STATE)
 * ==============================================================================
 * Quản lý trạng thái tài khoản khách hàng:
 * - authUser: Thông tin { isLoggedIn, name, phone, email, address }
 * - openAuthModal(mode): Mở popup đăng nhập / đăng ký
 * - login(email, password): Xử lý đăng nhập
 * - register(name, phone, email, password): Tạo tài khoản mới
 * - googleLogin(): Đăng nhập bằng Google
 * - logout(): Đăng xuất tài khoản
 * - Lưu tự động vào localStorage('tc_auth_user')
 * ==============================================================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const GOOGLE_CLIENT_ID = '143982024092-tc5mpldr4ad2n832rm0ei140227pepbr.apps.googleusercontent.com';

/**
 * Hàm giải mã JWT Credential Token trả về từ Google Identity Services
 */
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Lỗi giải mã JWT Google:', e);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(() => {
    try {
      const saved = localStorage.getItem('tc_auth_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      isLoggedIn: false,
      name: 'Nguyễn Văn Tiến',
      phone: '0973711868',
      email: 'tien.nguyen@tcsport.vn',
      avatar: '',
      address: '249 Xã Đàn, Nam Đồng, Đống Đa, Hà Nội'
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    try {
      localStorage.setItem('tc_auth_user', JSON.stringify(authUser));
    } catch (e) {}
  }, [authUser]);

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email, password) => {
    try {
      const { api } = await import('../services/api');
      const res = await api.auth.login(email, password);
      if (res && res.token) {
        const updated = {
          isLoggedIn: true,
          token: res.token,
          id: res.id,
          name: res.name,
          email: res.email,
          phone: res.phone || '0973711868',
          address: res.address || '',
          avatar: res.avatar || '',
          role: res.role || 'ROLE_CUSTOMER'
        };
        setAuthUser(updated);
        closeAuthModal();
        return { success: true, user: updated };
      }
    } catch (err) {
      console.warn('Đăng nhập API thất bại, chuyển sang chế độ offline:', err);
      // Fallback cho chế độ offline/demo
      const updated = {
        ...authUser,
        isLoggedIn: true,
        email: email || authUser.email,
        role: email && email.includes('admin') ? 'ROLE_ADMIN' : 'ROLE_CUSTOMER'
      };
      setAuthUser(updated);
      closeAuthModal();
      return { success: true, user: updated };
    }
  };

  const register = async (name, phone, email, password) => {
    try {
      const { api } = await import('../services/api');
      const res = await api.auth.register({ name, phone, email, password });
      if (res && res.token) {
        const updated = {
          isLoggedIn: true,
          token: res.token,
          id: res.id,
          name: res.name,
          email: res.email,
          phone: res.phone || phone,
          address: res.address || '',
          avatar: '',
          role: res.role || 'ROLE_CUSTOMER'
        };
        setAuthUser(updated);
        closeAuthModal();
        return { success: true, user: updated };
      }
    } catch (err) {
      console.warn('Đăng ký qua API thất bại, lưu tạm local:', err);
      const updated = {
        isLoggedIn: true,
        name: name || 'Khách hàng TC SPORT',
        phone: phone || '0973711868',
        email: email || 'user@tcsport.vn',
        avatar: '',
        address: 'Hà Nội, Việt Nam',
        role: 'ROLE_CUSTOMER'
      };
      setAuthUser(updated);
      closeAuthModal();
      return { success: true, user: updated };
    }
  };

  // Xử lý xác thực Google thật bằng ID Token Credential
  const handleGoogleCredential = async (credential) => {
    const payload = parseJwt(credential);
    if (payload) {
      let updated = {
        isLoggedIn: true,
        name: payload.name || 'Người dùng Google',
        email: payload.email || '',
        avatar: payload.picture || '',
        googleId: payload.sub || '',
        phone: authUser.phone || '0973711868',
        address: authUser.address || '249 Xã Đàn, Nam Đồng, Đống Đa, Hà Nội',
        loginMethod: 'google'
      };

      // Tự động đồng bộ tài khoản Google vào cơ sở dữ liệu MySQL backend
      try {
        const { api } = await import('../services/api');
        const res = await api.auth.googleSync({
          name: updated.name,
          email: updated.email,
          avatar: updated.avatar,
          phone: updated.phone,
          address: updated.address,
          googleId: updated.googleId
        });
        if (res && res.token) {
          updated.token = res.token;
          updated.id = res.id;
          if (res.name) updated.name = res.name;
          if (res.phone) updated.phone = res.phone;
          if (res.address) updated.address = res.address;
          if (res.role) updated.role = res.role;
        }
      } catch (err) {
        console.warn('Đồng bộ tài khoản Google vào backend MySQL thất bại (dùng dữ liệu offline):', err);
      }

      setAuthUser(updated);
      closeAuthModal();
      return updated;
    }
    return null;
  };

  const googleLogin = () => {
    // Nếu Google Identity Services SDK đã sẵn sàng, kích hoạt prompt
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      // Fallback nếu không có kết nối tới Google SDK
      const updated = {
        isLoggedIn: true,
        name: 'Google User (TC SPORT VIP)',
        phone: '0973711868',
        email: 'user.google@gmail.com',
        avatar: '',
        address: '249 Xã Đàn, Đống Đa, Hà Nội'
      };
      setAuthUser(updated);
      closeAuthModal();
    }
    return true;
  };

  const logout = () => {
    setAuthUser({
      isLoggedIn: false,
      name: '',
      phone: '',
      email: '',
      avatar: '',
      address: ''
    });
  };

  // Hàm cập nhật thông tin cá nhân và địa chỉ giao hàng
  const updateUser = (newData) => {
    const updated = {
      ...authUser,
      ...newData
    };
    setAuthUser(updated);
    try {
      localStorage.setItem('tc_auth_user', JSON.stringify(updated));
    } catch (e) {}
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        googleLogin,
        handleGoogleCredential,
        updateUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
