import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselButtons";
import MovieThumbnail from "./MovieThumbnail";
import { Movie } from "../types";

const Carousel = ({ data }: { data: Movie[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {data.map((movie, key) => {
          return (
            <div className="embla__slide" key={"slide" + key}>
              <MovieThumbnail {...movie} />
            </div>
          );
        })}
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
