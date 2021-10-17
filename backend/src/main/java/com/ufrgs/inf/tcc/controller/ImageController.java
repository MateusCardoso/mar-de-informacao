package com.ufrgs.inf.tcc.controller;

import com.ufrgs.inf.tcc.model.Image;
import com.ufrgs.inf.tcc.model.PostRecord;
import com.ufrgs.inf.tcc.repository.ImageRepository;
import com.ufrgs.inf.tcc.repository.PostRecordRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/images")
@Api(tags = { "images" })
public class ImageController {
    
    private ImageRepository imageRepository;
	private PostRecordRepository postRecordRepository;

	public ImageController(ImageRepository imageRepository, PostRecordRepository postRecordRepository) {
		this.imageRepository = imageRepository;
		this.postRecordRepository = postRecordRepository;
	}

    @GetMapping
	@ApiOperation(value = "Find all Images", nickname = "findAll")
	public Iterable<Image> findAll() {
		return imageRepository.findAll();
	}

    @GetMapping(value = "/{imageId}", produces = MediaType.IMAGE_JPEG_VALUE)
    Resource downloadImage(@PathVariable Long imageId) throws ObjectNotFoundException{
        if (!imageRepository.existsById(imageId)) {
			throw new ObjectNotFoundException(Image.class, imageId);
		}
        byte[] image = imageRepository.findById(imageId).get().getContent();

        return new ByteArrayResource(image);
    }

    @GetMapping(value = "/{imageId}/info")
    Image getImageInfo(@PathVariable Long imageId) throws ObjectNotFoundException{
        if (!imageRepository.existsById(imageId)) {
			throw new ObjectNotFoundException(Image.class, imageId);
		}
        Image imageInfo = imageRepository.findById(imageId).get();
        imageInfo.setContent(null);
        return imageInfo;
    }

    @PostMapping("/postId={postId}")
    @ApiOperation(value = "Create Image under Post", nickname = "createOnPost")
    Long uploadImage(@PathVariable("postId") Long postId, @RequestParam("category") Character category ,@RequestParam MultipartFile multipartImage) throws Exception{
        Image dbImage = new Image();
        dbImage.setName(multipartImage.getName());
        dbImage.setContent(multipartImage.getBytes());
        dbImage.setCategory(category);
        dbImage = imageRepository.save(dbImage);

        PostRecord postRecord = postRecordRepository.findById(postId).get();
        List<Image> currentImages = postRecordRepository.findImagesFromPost(postId);
        currentImages.add(dbImage);
        postRecord.setImages(currentImages);
        postRecordRepository.save(postRecord);
        dbImage.setPostRecord(postRecord);
        dbImage = imageRepository.save(dbImage);

        return dbImage.getId();            
    }

}
