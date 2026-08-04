package com.portfolio.backend.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {
    private static final long MAX_SIZE = 5 * 1024 * 1024;
    private static final String UPLOAD_MARKER = "/upload/";


    private final Cloudinary cloudinary;

    public String userAvatar(MultipartFile file, Long userId) {
        if (file.getSize() > MAX_SIZE) {
            throw new IllegalArgumentException("Avatar must be under 5MB");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Avatar must be an image");
        }

        String publicId = "avatar_" + userId;

        try {
            Map<?, ?> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "public_id", publicId,
                            "folder", "users",
                            "overwrite", true,
                            "invalidate", true,
                            "resource_type", "image"));

            return (String) result.get("secure_url");
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image", e);
        }
    }

    public String projectImage(MultipartFile file) {
        if (file.getSize() > MAX_SIZE) {
            throw new IllegalArgumentException("Image must be under 5MB");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("File must be an image");
        }

        String publicId = "project_" + java.util.UUID.randomUUID().toString();

        try {
            Map<?, ?> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "public_id", publicId,
                            "folder", "projects",
                            "overwrite", true,
                            "resource_type", "image"));

            return (String) result.get("secure_url");
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image", e);
        }
    }

    public String imageRemove(String imageUrl) {
        if (imageUrl == null || imageUrl.isBlank()) {
            throw new IllegalArgumentException("Image URL is required");
        }

        String filename = extractFilename(imageUrl);

        try {
            ApiResponse searchResult = cloudinary.search()
                    .expression("filename:" + filename)
                    .maxResults(1)
                    .execute();

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> resources =
                    (List<Map<String, Object>>) searchResult.get("resources");

            if (resources == null || resources.isEmpty()) {
                throw new RuntimeException("No Cloudinary asset found for filename: " + filename);
            }

            String publicId = (String) resources.getFirst().get("public_id");

            Map<?, ?> destroyResult = cloudinary.uploader().destroy(
                    publicId,
                    ObjectUtils.asMap(
                            "resource_type", "image",
                            "invalidate", true));

            return (String) destroyResult.get("result");
        } catch (Exception e) {
            throw new RuntimeException("Failed to remove image", e);
        }
    }


    private String extractFilename(String imageUrl) {
        int uploadIndex = imageUrl.indexOf(UPLOAD_MARKER);
        if (uploadIndex == -1) {
            throw new IllegalArgumentException("Not a valid Cloudinary URL: " + imageUrl);
        }

        String path = imageUrl.substring(uploadIndex + UPLOAD_MARKER.length());
        String lastSegment = path.substring(path.lastIndexOf('/') + 1);

        int dotIndex = lastSegment.lastIndexOf('.');
        return dotIndex != -1 ? lastSegment.substring(0, dotIndex) : lastSegment;
    }

}
