const referenceFileShow = document.getElementById('referenceFileShow');
const fileListShow = document.getElementById('fileListShow');
const referenceFile = document.getElementById('referenceFile');
const convertButton = document.getElementById('convertButton');
const uploadForm = document.getElementById('uploadForm');
const fileList = document.getElementById('fileList');

export function showReferenceFile (){
  document.getElementById('fileList').addEventListener('change', (event) => {
    const selectedFiles = event.target.files;
  
    fileListShow.innerHTML = '';
    referenceFileShow.innerHTML = '';
  
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

export function sentRequest() {
  convertButton.addEventListener('click', () => {
    uploadForm.submit();
  })

  uploadForm.addEventListener('submit', async (event) => {
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