package store.jackgnome.djarenaservice.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import store.jackgnome.djarenaservice.security.JwtAuthenticationFilter

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
class SecurityConfiguration(
    private val jwtAuthenticationFilter: JwtAuthenticationFilter,
    private val authenticationProvider: AuthenticationProvider
) {

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain = http
        .csrf { it.disable() }
        .cors { cors ->
            cors.configurationSource {
                CorsConfiguration().apply {
                    allowedOriginPatterns = listOf()
                    allowedOrigins = listOf("http://localhost:3001")
                    allowedMethods = listOf("GET", "POST", "PUT", "DELETE")
                    allowedHeaders = listOf("*")
                    allowCredentials = true
                }
            }
        }
        .authorizeHttpRequests {
            it.requestMatchers(HttpMethod.POST, "/api/v1/auth/sing-up").permitAll()
                .requestMatchers(HttpMethod.POST, "api/v1/auth/login").permitAll()
                .requestMatchers(HttpMethod.POST, "api/v1/auth/tokens").permitAll()
                .requestMatchers(HttpMethod.POST, "api/v1/auth/logout").authenticated()
                // Products
                .requestMatchers(HttpMethod.GET, "/api/v1/products/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/v1/products/**").hasAnyRole("ADMIN", "SALESMAN")
                .requestMatchers(HttpMethod.DELETE, "/api/v1/products/**").hasAnyRole("ADMIN", "SALESMAN")
                .requestMatchers(HttpMethod.PUT, "/api/v1/products/**").hasAnyRole("ADMIN", "SALESMAN")
                // Brands
                .requestMatchers(HttpMethod.GET, "/api/v1/brands/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/v1/brands/**").hasAnyRole("ADMIN", "SALESMAN")
                .requestMatchers(HttpMethod.DELETE, "/api/v1/brands/**").hasAnyRole("ADMIN", "SALESMAN")
                .requestMatchers(HttpMethod.PUT, "/api/v1/brands/**").hasAnyRole("ADMIN", "SALESMAN")

                .anyRequest().authenticated()
        }
        .sessionManagement {
            it.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        }
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter::class.java)
        .build()
}