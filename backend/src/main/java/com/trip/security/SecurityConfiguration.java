package com.trip.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

        private static final String[] WHITE_LIST_URL = { "/api/v1/auth/**",
                        "/v2/api-docs",
                        "/v3/api-docs",
                        "/v3/api-docs/**",
                        "/swagger-resources",
                        "/swagger-resources/**",
                        "/configuration/ui",
                        "/configuration/security",
                        "/swagger-ui/**",
                        "/webjars/**",
                        "/swagger-ui.html" };

        private final JwtAuthenticationFilter jwtAuthFilter;

        private final AuthenticationProvider authenticationProvider;

        private final LogoutHandler logoutHandler;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(AbstractHttpConfigurer::disable)
                                // Permission Based Allowance.
                                .authorizeHttpRequests(req -> req.requestMatchers(WHITE_LIST_URL)
                                                .permitAll()
                                                // .requestMatchers("/api/v1/management/**").hasAnyRole(Role.ADMIN.name(),
                                                // Role.TEACHER.name())
                                                // .requestMatchers(GET,
                                                // "/api/v1/management/**").hasAnyAuthority(Permission.ADMIN_READ.name(),
                                                // Permission.TEACHER_READ.name())
                                                // .requestMatchers(POST,
                                                // "/api/v1/management/**").hasAnyAuthority(Permission.ADMIN_CREATE.name(),
                                                // Permission.TEACHER_CREATE.name())
                                                // .requestMatchers(PUT,
                                                // "/api/v1/management/**").hasAnyAuthority(Permission.ADMIN_UPDATE.name(),
                                                // Permission.TEACHER_UPDATE.name())
                                                // .requestMatchers(DELETE,
                                                // "/api/v1/management/**").hasAnyAuthority(Permission.ADMIN_DELETE.name(),
                                                // Permission.TEACHER_DELETE.name())
                                                .anyRequest()
                                                .authenticated())

                                // Session Management.
                                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                                .authenticationProvider(authenticationProvider)
                                // Adding Our Filter.
                                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                                // Logging Out.
                                .logout(logout -> logout.logoutUrl("/api/v1/auth/logout")
                                                .addLogoutHandler(logoutHandler)
                                                .logoutSuccessHandler((request, response,
                                                                authentication) -> SecurityContextHolder
                                                                                .clearContext()))
                                .cors(Customizer.withDefaults());

                return http.build();
        }

        @Bean
        CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration corsConfiguration = new CorsConfiguration();

                corsConfiguration.setAllowedOrigins(
                                Arrays.asList("http://localhost:5173/", "http://127.0.0.1:5173/"));
                corsConfiguration.setAllowedMethods(
                                Arrays.asList("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS", "HEAD"));
                corsConfiguration.setAllowCredentials(true);
                corsConfiguration.setAllowedHeaders(Arrays.asList("Authorization", "Request-Type", "Content-Type"));
                corsConfiguration.setExposedHeaders(List.of("X-Get-Header"));
                corsConfiguration.setMaxAge(3600L);

                UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
                urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);

                return urlBasedCorsConfigurationSource;
        }
}
