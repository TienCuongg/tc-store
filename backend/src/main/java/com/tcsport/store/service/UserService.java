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

    public AuthDTO.AuthResponse syncGoogleUser(AuthDTO.GoogleSyncRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new RuntimeException("Email không được để trống!");
        }

        String targetEmail = request.getEmail().trim().toLowerCase();
        User user = userRepository.findByEmail(targetEmail)
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .email(targetEmail)
                            .name(request.getName() != null && !request.getName().isBlank() ? request.getName().trim() : "Khách hàng Google")
                            .phone(request.getPhone() != null ? request.getPhone().trim() : "0973711868")
                            .address(request.getAddress() != null ? request.getAddress().trim() : "249 Xã Đàn, Nam Đồng, Đống Đa, Hà Nội")
                            .avatar(request.getAvatar() != null ? request.getAvatar().trim() : "")
                            .password(passwordEncoder.encode(java.util.UUID.randomUUID().toString()))
                            .role("ROLE_CUSTOMER")
                            .build();
                    return userRepository.save(newUser);
                });

        boolean updated = false;
        if (request.getName() != null && !request.getName().isBlank() && !request.getName().equals(user.getName())) {
            user.setName(request.getName().trim());
            updated = true;
        }
        if (request.getAvatar() != null && !request.getAvatar().isBlank() && !request.getAvatar().equals(user.getAvatar())) {
            user.setAvatar(request.getAvatar().trim());
            updated = true;
        }
        if (request.getPhone() != null && !request.getPhone().isBlank() && (user.getPhone() == null || user.getPhone().isBlank())) {
            user.setPhone(request.getPhone().trim());
            updated = true;
        }
        if (request.getAddress() != null && !request.getAddress().isBlank() && (user.getAddress() == null || user.getAddress().isBlank())) {
            user.setAddress(request.getAddress().trim());
            updated = true;
        }
        if (updated) {
            user = userRepository.save(user);
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

    public AuthDTO.AuthResponse updateProfile(String email, AuthDTO.UserProfileUpdate request) {
        String targetEmail = (email != null && !email.isBlank()) ? email : request.getEmail();
        if (targetEmail == null || targetEmail.isBlank()) {
            throw new RuntimeException("Không xác định được email người dùng cần cập nhật!");
        }

        User user = userRepository.findByEmail(targetEmail.trim().toLowerCase())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với email: " + targetEmail));

        if (request.getName() != null && !request.getName().isBlank()) user.setName(request.getName().trim());
        if (request.getPhone() != null && !request.getPhone().isBlank()) user.setPhone(request.getPhone().trim());
        if (request.getAddress() != null && !request.getAddress().isBlank()) user.setAddress(request.getAddress().trim());
        if (request.getAvatar() != null && !request.getAvatar().isBlank()) user.setAvatar(request.getAvatar().trim());

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
