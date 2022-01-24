import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useResetRecoilState } from 'recoil';
import Banner from '../components/Banner';
import CourseCard from '../components/CourseCard';
import Instructors from '../components/Instructors';
import { supabase } from '../lib/supabaseClient';
import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';
import { Author, FullCourse } from '../types';

const Home: React.FC<{ courses: FullCourse[]; authors: Author[] }> = ({ courses, authors }) => {
  const [pulledCourses, setPulledCourses] = useState<FullCourse[]>(courses);
  const router = useRouter();
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
    <div className="w-full h-full text-white bg-gray-700">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="">
        <Banner />
        <p className="p-5 text-xl font-bold">Our courses</p>
        <div className="relative w-full flex p-5 space-x-5 text-gray-100">
          {pulledCourses.map((item) => (
            <CourseCard key={item.id} course={item} />
          ))}
        </div>
        <p className="p-5 text-xl font-bold">Our instructors</p>
        {authors.map((author) => (
          <Instructors instructor={author} />
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
    .select(`*, author(*), subcategory(name, main_category(name))`);
  const { data: authors } = await supabase
    .from('profiles')
    .select(`username, avatar_url, headline`)
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
