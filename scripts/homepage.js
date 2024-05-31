
import {showReferenceFile, sendARBRequest, arbFilesSelect} from './prepareToTranslate.js';
import {showSelectedFile, sendExcelRequest, excelFilesSelect} from './convertTranslation.js';


const selectElement = document.getElementById('selectOption');
selectElement.addEventListener('change', executeBySelectedOption);

function executeBySelectedOption(){
  const hintElement = document.getElementById('hint');
  const uploadButton = document.getElementById('uploadButton');
  const fileList = document.getElementById('fileList');
  const excelFile = document.getElementById('excelFile');
  const selectedValue = selectElement.value;

  let hintText;
  uploadButton.disabled = false;

  if (selectedValue === 'prepare_to_translate') {
    hintText = 'Your files must be in standard (.ARB) format.';
    fileList.accept = ".arb"
    this.disabled = true;
    arbFilesSelect();
    showReferenceFile();
    sendARBRequest();
    }
    else if (selectedValue === 'convert_translation'){
    hintText = 'Your file must be in standard (.Excel) format.';
    excelFile.accept = ".xlsx , .xls"
    this.disabled = true;
    excelFilesSelect();
    showSelectedFile();
    sendExcelRequest();
  }else{
    hintText = 'You selected Wrong files!.';
    const convertButton = document.getElementById('convertButton')
    convertButton.disabled = true;
  }
  hintElement.textContent = hintText;
};