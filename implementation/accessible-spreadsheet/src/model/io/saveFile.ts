// TODO: data (cells) needs to get here from the spreadsheet

const saveFile = () => {
  console.log('Saving file');

  // Get data from spreadsheet into JSON format
  const json = JSON.stringify(cells);
  const blob = new Blob([json], {type: "application/json"});
  const url = URL.createObjectURL(blob);

  // Create a link to download the file
  const link = document.createElement('a');
  link.href = url;
  link.download = 'spreadsheet.json';
  document.body.appendChild(link);
  link.click();

  // Clean up created file from memory
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}