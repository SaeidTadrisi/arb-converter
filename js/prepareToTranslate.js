const referenceFileShow = document.getElementById('referenceFileShow');
const fileListShow = document.getElementById('fileListShow');
const referenceFile = document.getElementById('referenceFile');
const convertButton = document.getElementById('convertButton');
const uploadFormARB = document.getElementById('uploadFormARB');
const fileList = document.getElementById('fileList');
const uploadButton = document.getElementById('uploadButton');


export function showReferenceFile (){
  fileListShow.innerHTML = '';
  referenceFileShow.innerHTML = '';

  document.getElementById('fileList').addEventListener('change', (event) => {
    const selectedFiles = event.target.files;
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const listItem = document.createElement('li');

      listItem.addEventListener('click', (clickEvent) => {
        const selectedFileName = clickEvent.currentTarget.textContent;
      
        referenceFileShow.innerHTML = selectedFileName;
        referenceFile.value = selectedFileName;
      });

      listItem.textContent = file.name;
      fileListShow.appendChild(listItem);
    }
  });
}

export function sentARBRequest() {
  convertButton.addEventListener('click', () => {
    uploadFormARB.submit();
  })

  uploadFormARB.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();

    for (let i = 0; i < fileList.files.length; i++) {
      formData.append('fileList', fileList.files[i]);
    }

    formData.append('referenceFile', referenceFile.value);
    try {
        const response = await fetch('https://arb-excel-converter-web.onrender.com/translate/prepare-translate', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {            
            const data = await response.blob();
        } else {
        }
    } catch (error) {
        console.error('Error uploading files:', error);
    }
});
}

export function arbFilesSelect(){
  uploadButton.addEventListener('click', () => {
    fileList.click();
  })
}