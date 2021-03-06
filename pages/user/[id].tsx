import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Tab } from '@headlessui/react';
import Profile from '../../components/user/Profile';
import { EnrolledCourse, FullCourse, ProfileType } from '../../types';
import MyCourses from '../../components/user/MyCourses';
import { AiOutlineHome } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { userProfileAtom } from '../../recoil/atoms/userProfileAtom';
import { useRecoilState } from 'recoil';
import EnrolledCourses from '../../components/user/EnrolledCourses';

const User: React.FC<{ courses: FullCourse[]; profile: ProfileType; enrolled_courses: EnrolledCourse[] }> = ({
  courses,
  profile,
  enrolled_courses,
}) => {
  const [userProfile, setUserProfile] = useRecoilState<ProfileType>(userProfileAtom);
  const router = useRouter();
  useEffect(() => {
    setUserProfile(profile);
  }, [profile]);
  return (
    <div className="relative w-full px-3 sm:px-5 md:px-14 xl:px-[100px] flex-grow text-white pb-5">
      <Tab.Group defaultIndex={1}>
        <Tab.List className="flex items-center justify-center space-x-1">
          <Tab
            className={({ selected }) =>
              selected
                ? 'border-blue-300 border-b-2 p-3 font-bold text-sm outline-none text-gray-200 bg-gray-600 w-56'
                : 'p-3 text-sm w-56 text-white hover:bg-gray-500 hover:shadow-md shadow-gray-800'
            }
          >
            Profile
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? 'border-blue-300 border-b-2 p-3 font-bold text-sm outline-none text-gray-200 bg-gray-600 w-56'
                : 'p-3 text-sm w-56 text-white hover:bg-gray-500 hover:shadow-md shadow-gray-800'
            }
          >
            My courses
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? 'border-blue-300 border-b-2 p-3 font-bold text-sm outline-none text-gray-200 bg-gray-600 w-56'
                : 'p-3 text-sm w-56 text-white hover:bg-gray-500 hover:shadow-md shadow-gray-800'
            }
          >
            Enrolled courses
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? 'border-blue-300 border-b-2 p-3 font-bold text-sm outline-none text-gray-200 bg-gray-600 w-56'
                : 'p-3 text-sm w-56 text-white hover:bg-gray-500 hover:shadow-md shadow-gray-800'
            }
          >
            Price settings
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-5">
          <Tab.Panel className="outline-none">
            <Profile />
          </Tab.Panel>
          <Tab.Panel className="outline-none">
            <MyCourses courses={courses} />
          </Tab.Panel>
          <Tab.Panel className="outline-none">
            <EnrolledCourses courses={enrolled_courses} />
          </Tab.Panel>
          <Tab.Panel className="outline-none"></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default User;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req);

  const id = context.params.id;

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/login', permanent: false } };
  }
  if (user.id !== id) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } };
  }

  const { data: profile } = await supabase.from('profiles').select(`*`).match({ id });
  const { data: course } = await supabase
    .from('courses')
    .select(`*, author(*), subcategory(name, main_category(name))`)
    .eq('author', id);
  const { data: enrolled } = await supabase
    .from('enrolled_courses')
    .select(`id, course: course(*, author(*))`)
    .eq('person', id);

  return {
    props: {
      profile: JSON.parse(JSON.stringify(profile[0])),
      courses: JSON.parse(JSON.stringify(course)),
      enrolled_courses: JSON.parse(JSON.stringify(enrolled)),
    },
  };
};
