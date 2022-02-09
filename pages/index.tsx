import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import Banner from '../components/Banner';
import CourseCard from '../components/CourseCard';
import Instructors from '../components/Instructors';
import { supabase } from '../lib/supabaseClient';
import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';
import { Author, FullCourse } from '../types';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { HiOutlineCheck } from 'react-icons/hi';
import { cartAtom } from '../recoil/atoms/cartAtom';
import produce from 'immer';
import { arrContains } from '../lib/helpers';
import Link from 'next/link';
import { enrolledAtom } from '../recoil/atoms/enrolledAtom';
import { EmblaCarousel } from '../components/EmblaCarousel';

const Home: React.FC<{ courses: FullCourse[]; authors: Author[] }> = ({ courses, authors }) => {
  const [pulledCourses, setPulledCourses] = useState<FullCourse[]>(courses);
  const router = useRouter();
  const [session, setSession] = useState(null);
  const resetList = useResetRecoilState(courseBuildAtom);
  const [cart, setCart] = useRecoilState<FullCourse[]>(cartAtom);
  const [enrolled, setEnrolled] = useRecoilState<any[]>(enrolledAtom);

  useEffect(() => {
    setSession(supabase.auth.session());
    resetList();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [resetList]);

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
      {item.what_youll_learn.map((wyl) => (
        <div key={wyl.id} className="flex items-start space-x-1">
          <HiOutlineCheck className="w-5 h-4" />
          <p className="text-xs">{wyl.title}</p>
        </div>
      ))}
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
    <div className="flex-grow w-full h-full text-white bg-gray-700">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="">
        <Banner />
        <p className="p-5 text-xl font-bold">Courses</p>
        <div className="p-3">
          <EmblaCarousel course={courses} />
        </div>
        {/* <div className="relative flex w-full px-5 pb-5 space-x-5 text-gray-100">
          {pulledCourses.map((item) => (
            <div key={item.id}>
              <Tippy
                content={tippyContent(item)}
                animation="fade"
                interactive={true}
                arrow={true}
                theme="dark-course"
                placement="right"
                maxWidth="100%"
              >
                <div>
                  <CourseCard course={item} />
                </div>
              </Tippy>
            </div>
          ))}
        </div> */}
        <p className="p-5 text-xl font-bold bg-zinc-600 ">Instructors</p>
        {authors.map((author) => (
          <Instructors key={author.id} instructor={author} />
        ))}
      </section>
    </div>
  );
};
export default Home;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  const { data: courses } = await supabase
    .from('courses')
    .select(
      `id, title, slug, description, author(*), image, preview, price, discount_price, brief_description, language, updated_at, what_youll_learn, subcategory(name, main_category(name))`
    );
  const { data: authors } = await supabase
    .from('profiles')
    .select(`id, username, avatar_url, headline`)
    .eq('role', 'teacher');
  // console.log(JSON.stringify(data[0], null, 2), error);
  // console.log(data);
  return {
    props: {
      courses: JSON.parse(JSON.stringify(courses)),
      authors: JSON.parse(JSON.stringify(authors)),
    },
  };
}
