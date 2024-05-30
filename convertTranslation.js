const referenceFileShow = document.getElementById('referenceFileShow');
const fileListShow = document.getElementById('fileListShow');
const excelFile = document.getElementById('excelFile');
const uploadButton = document.getElementById('uploadButton');



export function showSelectedFile() {
  fileListShow.innerHTML = '';
  referenceFileShow.innerHTML = '';

  excelFile.addEventListener('change', (event) => {
    const selectedFile = event.target.files;
    const file = selectedFile[0];
      fileListShow.innerHTML = file.name;
    });
}

export function sentExcelRequest() {
  convertButton.addEventListener('click', () => {
    uploadFormExcel.submit();
  })

  uploadFormExcel.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const selectedFile = excelFile.files;

      formData.append('file', fileList.files[0]);
    
    try {
        const response = await fetch('https://arb-excel-converter-web.onrender.com/translate/convert-translation', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {            
            const zipBlob = await response.blob();
        } else {
        }
    } catch (error) {
        console.error('Error uploading files:', error);
    }
});
}

export function excelFilesSelect(){
  uploadButton.addEventListener('click', () => {
    excelFile.click();
  })
}