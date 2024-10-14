import { ImageSlider } from './components/image-slider/ImageSlider';

function App() {
  return (
    <div>
      <ImageSlider url="https://picsum.photos/v2/list/" limit={5} />
    </div>
  );
}

export default App;