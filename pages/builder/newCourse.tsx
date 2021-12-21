import BuilderAccordion from '../../components/BuilderAccordion';
import axios from 'axios';
import { courseBuildAtom } from '../../recoil/atoms/courseBuildAtom';
import { useRecoilState } from 'recoil';
import { Course } from '../../types';

const Builder: React.FC<{}> = () => {
  const [courseInfo, setCourseInfo] = useRecoilState<Course>(courseBuildAtom);
  const saveData = (): void => {
    console.log(courseInfo);
    axios
      .post('/api/courseBuilder', {
        courseInfo,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="w-full screen-h">
      <h1 className="mx-auto text-2xl my-3 text-center">{courseInfo.courseName}</h1>
      <div>
        <BuilderAccordion />
      </div>
      <div>
        <button onClick={saveData} className="p-3 border">
          Save course
        </button>
      </div>
    </div>
  );
};
export default Builder;
