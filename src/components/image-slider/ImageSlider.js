import { useEffect, useState } from 'react';
import './styles.css';

export const ImageSlider = ({
  // URL to retrieve image
  url,

  // Number of images to be shown in image slider
  numOfImages = 10
}) => {
  // State management to track the all images
  const [imageList, setImageList] = useState([]);

  // State management to track the selected image to be displayed
  const [selectedImage, setSelectedImage] = useState(0);

  // State management to track the possible error to get image list
  const [errorMsg, setErrorMsg] = useState('');

  // State management to track the loading state to get image list
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve images from the specified URL
    async function getImages() {
      try {
        setIsLoading(true);
        const images = await fetch(`${url}?limit=${numOfImages}`);
        const imageContent = await images.json();
        setImageList(imageContent);
        setErrorMsg('');
      } catch (e) {
        setErrorMsg(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [numOfImages, url]);

  // Handle arrows for circular navigation
  const handleClickArrow = (delta) => {
    setSelectedImage((delta + selectedImage) % numOfImages);
  };

  // Handle navigation controls by dots
  const handleClickDot = (index) => setSelectedImage(index);

  // Show loading state
  if (isLoading) {
    return <div className="container">Loading...</div>;
  }

  // Show error state
  if (errorMsg) {
    return <div className="container">Error to fetch image: {errorMsg}</div>;
  }

  return (
    <div className="container">
      {imageList.map(
        (image, index) => (
          // Display the selected image, using "display: none" to avoid blinking
          <img
            key={image.id}
            width="100%"
            height="100%"
            src={image.download_url}
            alt="image.download_url"
            className={index !== selectedImage ? 'hide-image' : ''}
          />
        )
      )}

      {/* The left arrow is displayed with "position: absolute" and "left: 1em" */}
      <button
        className="arrow arrow-left"
        onClick={() => handleClickArrow(numOfImages - 1)}
      >
        {'<'}
      </button>

      {/* The right arrow is displayed with "position: absolute" and "right: 1em" */}
      <button
        className="arrow arrow-right"
        onClick={() => handleClickArrow(1)} >
        {'>'}
      </button>

      {/* The dots are displayed with "position: absolute" and "bottom: 1em" */}
      <div className="dots-container">
        {[...Array(numOfImages)].map((_, index) => (
          <div
            key={index}

            // The selected image is associated with the corresponding dot
            className={index === selectedImage ? 'dot dot-active' : 'dot dot-inactive'}
            onClick={() => handleClickDot(index)}
          />
        ))}
      </div>
    </div>
  );
};