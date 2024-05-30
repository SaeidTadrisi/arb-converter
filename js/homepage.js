
import {showReferenceFile, sentARBRequest, arbFilesSelect} from './prepareToTranslate.js';
import {showSelectedFile, sentExcelRequest, excelFilesSelect} from './convertTranslation.js';

const hintElement = document.getElementById('hint');
const uploadButton = document.getElementById('uploadButton');
const fileList = document.getElementById('fileList');
const excelFile = document.getElementById('excelFile');
const selectElement = document.getElementById("selectOption");

selectElement.addEventListener('change', executeBySelectedOption);

function executeBySelectedOption(){
  const selectedValue = selectElement.value;

  let hintText;
  uploadButton.disabled = false;

  if (selectedValue === 'prepare_to_translate') {
    hintText = 'Your files must be in standard (.ARB) format.';
    fileList.accept = ".arb"
    this.disabled = true;
    arbFilesSelect();
    showReferenceFile();
    sentARBRequest();
    }
    else if (selectedValue === 'convert_translation'){
    hintText = 'Your file must be in standard (.Excel) format.';
    excelFile.accept = ".xlsx , .xls"
    this.disabled = true;
    excelFilesSelect();
    showSelectedFile();
    sentExcelRequest();
  }
  hintElement.textContent = hintText;
};
