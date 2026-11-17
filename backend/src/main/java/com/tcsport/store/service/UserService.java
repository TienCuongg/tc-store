package com.tcsport.store.service;

import com.tcsport.store.config.JwtTokenProvider;
import com.tcsport.store.dto.AuthDTO;
import com.tcsport.store.entity.User;
import com.tcsport.store.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthDTO.AuthResponse login(AuthDTO.LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email hoặc mật khẩu không chính xác!"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Email hoặc mật khẩu không chính xác!");
        }

        String token = tokenProvider.generateToken(user.getEmail(), user.getRole());

        return AuthDTO.AuthResponse.builder()
                .token(token)
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .phone(user.getPhone())
                .address(user.getAddress())
                .avatar(user.getAvatar())
                .role(user.getRole())
                .build();
    }

    public AuthDTO.AuthResponse register(AuthDTO.RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email này đã được sử dụng!");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("ROLE_CUSTOMER")
                .build();

        userRepository.save(user);

        String token = tokenProvider.generateToken(user.getEmail(), user.getRole());

        return AuthDTO.AuthResponse.builder()
                .token(token)
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .phone(user.getPhone())
                .address(user.getAddress())
                .avatar(user.getAvatar())
                .role(user.getRole())
                .build();
    }

    public AuthDTO.AuthResponse updateProfile(String email, AuthDTO.UserProfileUpdate request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng!"));

        if (request.getName() != null) user.setName(request.getName().trim());
        if (request.getPhone() != null) user.setPhone(request.getPhone().trim());
        if (request.getAddress() != null) user.setAddress(request.getAddress().trim());
        if (request.getAvatar() != null) user.setAvatar(request.getAvatar().trim());

        userRepository.save(user);

        String token = tokenProvider.generateToken(user.getEmail(), user.getRole());

        return AuthDTO.AuthResponse.builder()
                .token(token)
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .phone(user.getPhone())
                .address(user.getAddress())
                .avatar(user.getAvatar())
                .role(user.getRole())
                .build();
    }
}
