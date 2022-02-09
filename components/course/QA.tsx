import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { enrolledCourseQAAtom } from '../../recoil/atoms/enrolledCourseQAAtom';
import { CommentsAnswers, CommentsQuestions } from '../../types';

export const Answers: React.FC<{ answers: CommentsAnswers[] }> = ({ answers }) => {
  console.log(answers);
  return (
    <div className="w-full space-y-2">
      {answers.map((item) => (
        <div key={`a-${item.id}`} className="w-full">
          <div className="flex items-center justify-end w-full space-x-3">
            <div className="w-[35px] h-[35px] rounded-full border border-gray-400 overflow-hidden">
              <Image
                src={item.author.avatar_url}
                alt={item.author.username}
                width={35}
                height={35}
                objectFit="scale-down"
              />
            </div>
            <div className="flex w-3/4 p-2 space-x-1 text-gray-300 border-b border-gray-400 rounded-xl">
              <p className="text-sm">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="w-full ">
        <div className="flex flex-col items-end justify-end w-full space-y-1">
          <textarea className="justify-end w-3/4 h-14 textarea textarea-bordered" placeholder="Answer"></textarea>
          <button className="btn btn-sm">Post</button>
        </div>
      </div>
    </div>
  );
};

const QA: React.FC<{}> = () => {
  const [qa, setQa] = useRecoilState<CommentsQuestions[]>(enrolledCourseQAAtom);

  return (
    <div className="flex flex-col pb-5 space-y-2">
      <div className="w-full ">
        <label className="label">
          <span className="text-xs label-text">New question</span>
        </label>
        <textarea className="w-full h-14 textarea textarea-bordered" placeholder="Question"></textarea>
        <button className="btn btn-sm">Post</button>
      </div>
      <div className="border-b" />
      <div className="flex flex-col">
        <div className="flex space-x-2">
          {qa.map((item) => (
            <div key={`q-${item.id}`} className="flex flex-col w-full space-y-2">
              <div className="flex items-center w-full space-x-3 ">
                <div className="w-[35px] h-[35px] rounded-full border border-gray-400 overflow-hidden">
                  <Image
                    src={item.author.avatar_url}
                    alt={item.author.username}
                    width={35}
                    height={35}
                    objectFit="scale-down"
                  />
                </div>
                <div className="flex w-3/4 p-2 space-x-1 text-sm border-b border-gray-400 rounded-xl">
                  <span className="font-extrabold">Question: </span>
                  <p className="">{item.question}</p>
                </div>
              </div>
              <Answers answers={item.comments_answers} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QA;
