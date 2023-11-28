const loadFile = () => {

  // Prompt user for file to load
  var input = document.createElement('input');
  input.type = 'file';

  // When file selected, read contents of file
  input.onchange = (e: any) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    // When done reading, assign to cells
    // TODO: actually assign to cells dict
    reader.onload = readerEvent => {
      var cellsFromFile = readerEvent.target!.result;
      console.log(cellsFromFile);
    }
  };
  input.click();
}