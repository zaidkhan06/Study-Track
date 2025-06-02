package com.StudyTrack.StudyTrackBackend.Controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.StudyTrack.StudyTrackBackend.Entity.UserProfile;
import com.StudyTrack.StudyTrackBackend.Repository.UserProfileRepository;
import com.StudyTrack.StudyTrackBackend.Security.JwtUtils;
import com.StudyTrack.StudyTrackBackend.Service.UserProfileService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class AuthController {

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public String register(@RequestBody UserProfile userProfile) {
        System.out.println(userProfile);
        if(!userProfileRepository.findByEmail(userProfile.getEmail()).isEmpty()){
            return "Email already registered";
        }
        userProfile.setPassword(passwordEncoder.encode(userProfile.getPassword()));
        System.out.println(userProfile);
        userProfileRepository.save(userProfile);
        return "User registered successfully!";
    }

    @CrossOrigin("http://localhost:3000")
    @PostMapping("/deleteByEmail")
    public String deleteByEmail(@RequestBody Map<String, String> credentials){
        String email = credentials.get("email");
        System.out.println(credentials.get("email"));
        UserProfile userProfile = userProfileRepository.findByEmail(email).orElse(null);
        System.out.println(userProfile);
        if(userProfile == null) return "User not found";
        userProfileRepository.deleteById(userProfile.getId());
        System.out.println("deleted");
        return "user deleted successfully";
    }

    @GetMapping("/home")
    public String home(){
        return "Home";
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        System.out.println("Email: " + email);
        System.out.println("Password: " + password);

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            String token = jwtUtils.generateToken(email);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("token", token);
            UserProfile userProfile = userProfileRepository.findByEmail(email).orElse(null);
            if(userProfile!=null) {
                response.put("name", String.valueOf(userProfile.getName()));
                response.put("email", String.valueOf(userProfile.getEmail()));
                response.put("phone", String.valueOf(userProfile.getPhoneNumber()));
                response.put("university", String.valueOf(userProfile.getUniversityName()));
                response.put("role", String.valueOf(userProfile.getRole()));
                if(userProfile.getRole().equals("admin")){
                    List<UserProfile> users = userProfileRepository.findAll();
                    try {
                        response.put("users", new ObjectMapper().writeValueAsString(users));
                    } catch (JsonProcessingException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
            return response;
        } catch (AuthenticationException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid email or password");
            return response;
        }
    }

    @PostMapping("/updatePassword")
    public String updatePassword(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String newPassword = credentials.get("newPassword");
        String confirmPassword = credentials.get("confirmPassword");

        Optional<UserProfile> userProfileOptional = userProfileRepository.findByEmail(email);
        if (userProfileOptional.isEmpty()) {
            return "User not found";
        }

        if (!newPassword.equals(confirmPassword)) {
            return "Passwords do not match";
        }

        if (newPassword.length() < 6) {
            return "New password must be at least 6 characters";
        }

        UserProfile userProfile = userProfileOptional.get();
        userProfile.setPassword(passwordEncoder.encode(newPassword));
        userProfileRepository.save(userProfile);

        return "Password updated successfully!";
    }

   // Controller Class
   @Autowired
   private UserProfileService userProfileService;
   
   @GetMapping("/api/profile/{email}")
   public ResponseEntity<UserProfile> getProfile(@PathVariable String email) {
       UserProfile profile = userProfileService.getProfileByEmail(email);
       return ResponseEntity.ok(profile);
   }

}
