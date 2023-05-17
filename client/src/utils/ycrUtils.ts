import JSZip from 'jszip';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../App';
import { RecorderActions } from '../types/Editor';

export function str2ab(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length * 2);
  const bufView = new Uint16Array(buf);
  for (let i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export async function saveYCRFile(
  jsonBlob: Blob,
  audioBlob: Blob,
  userId: string
) {
  const zip = new JSZip();
  zip.file('recorderActions.json', jsonBlob);
  zip.file('recordedAudio.webm', audioBlob);
  const ycrBlob = await zip.generateAsync({ type: 'blob' });
  const fileRef = ref(
    storage,
    `recordings/${userId}/recording_${Date.now()}.ycr`
  );
  await uploadBytes(fileRef, ycrBlob);
  const fileUrl = await getDownloadURL(fileRef);
  return fileUrl;
}

export async function deleteYCRFile(fileUrl: string) {
  const filePath = decodeURIComponent(
    fileUrl.split('/o/')[1].split('?alt=')[0]
  );

  const fileRef = ref(storage, filePath);

  try {
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Failed to delete file from firebase', error);
  }
}

export async function loadYCRFile(
  file: File
): Promise<{ recorderActions: RecorderActions; recordedAudioURL: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const zip = new JSZip();
        zip
          .loadAsync(event.target!.result as ArrayBuffer)
          .then((unzippedData) => {
            const promises = [];

            promises.push(
              unzippedData.file('recorderActions.json')!.async('string')
            );
            promises.push(
              unzippedData.file('recordedAudio.webm')!.async('blob')
            );

            Promise.all(promises).then((results) => {
              const [recorderActionsJSON, recordedAudioBlob] = results as [
                string,
                Blob
              ];
              const recorderActions = JSON.parse(recorderActionsJSON);
              const recordedAudioURL = URL.createObjectURL(recordedAudioBlob);
              resolve({ recorderActions, recordedAudioURL });
            });
          });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
}
