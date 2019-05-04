package com.student.hbnu.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.student.hbnu.service.impl.Face.Train;


@RestController
@RequestMapping(value="/faceTest")
public class FaceRecognitionController {

	@Resource
	private Train train;

	@RequestMapping("/MessageApi/getPopMsg")
	public String Test1() {
		System.out.println("/MessageApi/getPopMsg");
		
		return "Hellow World";
	}
	
//	@RequestMapping(value="/UploadApi/uploadCourseware", method=RequestMethod.POST)
//	public String Test6(@RequestParam MultipartFile file,HttpServletRequest request,HttpServletResponse response) throws IOException {
//        //获取文件名
//        String originalFilename = file.getOriginalFilename();
//        System.out.println("上传文件名：" + originalFilename);
//        String realPath = "d:";
//        String uploadFileName = System.currentTimeMillis()+"_"+ originalFilename;
//        System.out.println("获取上传路径：" + realPath + ", 上传的真实文件名：" + uploadFileName);
//        boolean flag = true;
//
//        //合并文件
//        RandomAccessFile raFile = null;
//        BufferedInputStream inputStream = null;
//        try{
//            File dirFile = new File(realPath, uploadFileName);
//            //以读写的方式打开目标文件
//            raFile = new RandomAccessFile(dirFile, "rw");
//            raFile.seek(raFile.length());
//            inputStream = new BufferedInputStream(file.getInputStream());
//            byte[] buf = new byte[1024];
//            int length = 0;
//            while ((length = inputStream.read(buf)) != -1) {
//                raFile.write(buf, 0, length);
//            }
//        }catch(Exception e){
//            flag = false;
//            System.out.println("上传出错:" + e.getMessage());
//            throw new IOException(e.getMessage());
//        }finally{
//            try {
//                if (inputStream != null) {
//                    inputStream.close();
//                }
//                if (raFile != null) {
//                    raFile.close();
//                }
//            }catch(Exception e){
//                flag = false;
//                System.out.println("上传出错:" + e.getMessage());
//                throw new IOException(e.getMessage());
//            }
//        }
//        UploadFileResponse ufr = new UploadFileResponse();
//        ufr.setData(new UploadFileData());
//		return GsonUtil.GsonString(ufr);
//	}
	@RequestMapping(value="/initTrain",method=RequestMethod.GET)
	public String initTrain() {
		
		this.train.initTrain();
		return null;
	}
}
