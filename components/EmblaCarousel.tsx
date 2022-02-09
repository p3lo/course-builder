import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import CourseCard from './CourseCard';
import { NextButton, PrevButton } from './EmblaCarouselButtons';
import { FullCourse } from '../types';
import { HiOutlineCheck } from 'react-icons/hi';
import { arrContains } from '../lib/helpers';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { enrolledAtom } from '../recoil/atoms/enrolledAtom';
import { cartAtom } from '../recoil/atoms/cartAtom';
import produce from 'immer';
import Tippy from '@tippyjs/react';

export const EmblaCarousel: React.FC<{ course: FullCourse[] }> = ({ course }) => {
  const [emblaRef, embla] = useEmblaCarousel({ align: 'start', slidesToScroll: 3, loop: false, draggable: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [enrolled, setEnrolled] = useRecoilState<any[]>(enrolledAtom);
  const [cart, setCart] = useRecoilState<FullCourse[]>(cartAtom);
  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on('select', onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  const addToCart = (item: FullCourse) => {
    if (!cart.some((incart) => incart.id === item.id)) {
      const removeContent = produce(item, (draft) => {
        draft.content = [];
      });
      setCart((prev) => [...prev, removeContent]);
    }
  };

  const tippyContent = (item: FullCourse) => (
    <div className="space-y-1 ">
      <p className="text-xl font-bold">{item.title}</p>
      {item.what_youll_learn.map(
        (wyl, index) =>
          index < 3 && (
            <div key={wyl.id} className="flex items-start space-x-1">
              <p className="text-xs first-letter:font-extrabold first-letter:float-left">{wyl.title}</p>
            </div>
          )
      )}
      <div className="flex items-center justify-center pt-3 pb-2">
        {arrContains(enrolled, item.id) ? (
          <Link href={`/course/${item.slug}`}>
            <a className="px-5 py-2 border">Go to course</a>
          </Link>
        ) : (
          <button className="px-5 py-2 border" onClick={() => addToCart(item)}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {course.map((item) => (
            <div key={item.title} className=" embla__slide">
              <Tippy
                content={tippyContent(item)}
                animation="fade"
                interactive={true}
                arrow={true}
                theme="dark-course"
                placement="right"
                // offset={[0, 0]}
                maxWidth="100%"
              >
                <div>
                  <CourseCard course={item} />
                </div>
              </Tippy>
            </div>
          ))}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </div>
  );
};
