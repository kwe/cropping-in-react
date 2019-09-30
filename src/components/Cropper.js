import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

class Cropper extends PureComponent {
  state = {
    src: "max.jpg",
    crop: {
      unit: "px",
      aspect: 16 / 9,
      height: 420
    }
  };
  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };
  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };
  onImageLoaded = image => {
    this.imageRef = image;
  };
  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }
  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;
    return (
      <div>
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            onComplete={this.onCropComplete}
            onImageLoaded={this.onImageLoaded}
            onChange={this.onCropChange}
            ruleOfThirds={true}
          />
        )}

        {croppedImageUrl && (
          <div>
            <img alt="Crop" style={{ height: "420px" }} src={croppedImageUrl} />
            <p>Here {croppedImageUrl} it is</p>
          </div>
        )}
      </div>
    );
  }
}

export default Cropper;
