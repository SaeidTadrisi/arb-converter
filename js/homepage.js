
import {showReferenceFile, sentRequest} from './prepare-to-translate.js';


const selectElement = document.getElementById('actionId');
const hintElement = document.getElementById('hint');
const uploadButton = document.getElementById('uploadButton');
const fileList = document.getElementById('fileList');

uploadButton.addEventListener('click', () => {
  fileList.click();
})

selectElement.addEventListener('change', function() {
  const selectedValue = selectElement.value;
  let hintText;
  uploadButton.disabled = false;

  switch (selectedValue) {
    
    case 'prepare_to_translate':
      fileList.multiple = true;
      hintText = 'Your files must be in standard (.ARB) format.';
      fileList.accept = ".arb"
      showReferenceFile();
      sentRequest();
      break;
    case 'convert_translation':
      fileList.multiple = false;
      hintText = 'Your file must be in standard (.Excel) format.';
      fileList.accept = ".xlsx , .xls"
      break;
  }
  hintElement.textContent = hintText;
});