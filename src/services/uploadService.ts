// src/services/uploadService.ts
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export const uploadFileToFirebase = (
  file: File,
  pathPrefix = "uploads"
): Promise<{ url: string }> => {
  return new Promise((resolve, reject) => {
    const filename = `${pathPrefix}/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // you could wire progress to UI if you pass a callback; omitted for brevity
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
      },
      (error) => reject(error),
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({ url });
        } catch (e) {
          reject(e);
        }
      }
    );
  });
};
