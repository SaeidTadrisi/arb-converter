const referenceFileShow = document.getElementById('referenceFileShow');
const fileListShow = document.getElementById('fileListShow');
const excelFile = document.getElementById('excelFile');
const uploadButton = document.getElementById('uploadButton');
const message = document.getElementById('message');
const errorMessage = document.getElementById('errorMessage');

export function showSelectedFile() {
  fileListShow.innerHTML = '';
  referenceFileShow.innerHTML = '';

  excelFile.addEventListener('change', (event) => {
    const file = event.target.files[0];
    fileListShow.innerHTML = file.name;
    uploadButton.disabled = true;
  });
}

export async function sendExcelRequest() {
  if (!validateExcelFiles()) {
    return;
  }

  const excelFormData = new FormData();
  excelFormData.append('file', excelFile.files[0]);

  try {
    message.textContent = 'Waiting ...';
    const response = await fetch('https://arb-excel-converter-web.onrender.com/translate/convert-translation', {
      method: 'POST',
      body: excelFormData
    });

    if (response.ok) {
      const zipBlob = await response.blob();
      const tempURL = window.URL.createObjectURL(zipBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = tempURL;
      downloadLink.download = 'translation.zip';
      downloadLink.click();
      window.URL.revokeObjectURL(tempURL);

      message.textContent = 'Zip File Generated & Downloaded Successfully';
    } else {
      console.error('Error in server response:', response.statusText);
    }
  } catch (error) {
    console.error('Error uploading files:', error);
  }
}

function validateExcelFiles() {
  if (!excelFile.files.length) {
    errorMessage.textContent = '* Please select one file to upload.';
    return false;
  }

  const file = excelFile.files[0];
  const extension = file.name.split('.').pop().toLowerCase();

  if (extension !== 'xlsx' && extension !== 'xls') {
    errorMessage.textContent = '* Invalid file type. Only XLSX or XLS extensions are allowed.';
    return false;
  }

  errorMessage.textContent = '';
  return true;
}
