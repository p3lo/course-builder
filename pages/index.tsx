import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import Banner from '../components/Banner';
import Instructors from '../components/Instructors';
import { supabase } from '../lib/supabaseClient';
import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';
import { Author, FullCourse } from '../types';
import 'tippy.js/dist/tippy.css';
import { EmblaCarousel } from '../components/EmblaCarousel';

const Home: React.FC<{ courses: FullCourse[]; authors: Author[] }> = ({ courses, authors }) => {
  const [session, setSession] = useState(null);
  const resetList = useResetRecoilState(courseBuildAtom);

  useEffect(() => {
    setSession(supabase.auth.session());
    resetList();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [resetList]);

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
