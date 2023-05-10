import JSZip from 'jszip';

export function str2ab(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length * 2);
  const bufView = new Uint16Array(buf);
  for (let i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export async function saveYCRFile(jsonBlob: Blob, audioBlob: Blob) {
  const jsonBuffer = await jsonBlob.arrayBuffer();
  const audioBuffer = await audioBlob.arrayBuffer();
  const jsonLength = jsonBuffer.byteLength;
  const audioLength = audioBuffer.byteLength;

  const header = new ArrayBuffer(8);
  const headerView = new DataView(header);
  headerView.setUint32(0, jsonLength, true);
  headerView.setUint32(4, audioLength, true);

  const combinedBuffer = new ArrayBuffer(
    header.byteLength + jsonLength + audioLength
  );
  const combinedBufferView = new Uint8Array(combinedBuffer);
  combinedBufferView.set(new Uint8Array(header), 0);
  combinedBufferView.set(new Uint8Array(jsonBuffer), header.byteLength);
  combinedBufferView.set(
    new Uint8Array(audioBuffer),
    header.byteLength + jsonLength
  );

  const ycrBlob = new Blob([combinedBuffer], { type: 'application/ycr' });
  const fileName = 'recording.ycr';
  const url = URL.createObjectURL(ycrBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

export async function loadYCRFile(file: File) {
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
