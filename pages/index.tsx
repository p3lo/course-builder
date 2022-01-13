import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useResetRecoilState } from 'recoil';
import CourseCard from '../components/CourseCard';
import { supabase } from '../lib/supabaseClient';
import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';
import { FullCourse } from '../types';

const Home: React.FC<{ courses: FullCourse[] }> = ({ courses }) => {
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

      <div>
        <section>
          {session ? (
            <div className="flex space-x-5">
              <button
                className="p-3 border"
                onClick={() => {
                  supabase.auth.signOut();
                  router.push('/');
                }}
              >
                Sign out
              </button>
              <button
                className="p-3 border"
                onClick={() => {
                  router.push(`/user/${session.user.id}`);
                }}
              >
                Profile
              </button>
            </div>
          ) : (
            <button onClick={() => router.push('/login')}>Sign in</button>
          )}
        </section>
        <section className="">
          <div className="flex p-5 space-x-5 text-gray-100">
            {pulledCourses.map((item) => (
              <CourseCard key={item.id} course={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
export default Home;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  const { data, error } = await supabase.from('courses').select(`*, author(*), subcategory(name, main_category(name))`);
  // console.log(JSON.stringify(data[0], null, 2), error);
  // console.log(data);
  return {
    props: {
      courses: JSON.parse(JSON.stringify(data)),
    },
  };
}
