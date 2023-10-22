const AccessImage = ( data , {onImageUploaded} ) => {

  //Used to upload the image to cloudinary, appends key data and sends a POST.
  const handleUpload = (image) => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'k2017731')
    data.append('cloud_name', 'dcpxszs6j')

    fetch("https://api.cloudinary.com/v1_1/dcpxszs6j/image/upload", {
      method:"POST",
      body: data
    })
    .then(res => res.json())
    .then(data => {
      onImageUploaded(data.url); // call the callback function with the uploaded image URL
    })
    .catch(error => {
      console.log("Error uploading image:", error);
    });
  }
//Checks if data cancelled is falsy, if not create new object with properties. Splits out irrelevant data
  if(!data.cancelled) {
    let newfile = {
      uri: data.uri,
      type: `test/${data.uri.split(".")[1]}`,
      name: `test/${data.uri.split(".")[1]}`,
    }
  
  handleUpload(newfile)
  }
  
};

export default AccessImage;
