import produce from 'immer';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { supabase } from '../../lib/supabaseClient';
import { enrolledCourseQAAtom } from '../../recoil/atoms/enrolledCourseQAAtom';
import { CommentsAnswers, CommentsQuestions } from '../../types';

export const Answers: React.FC<{ question_id: number }> = ({ question_id }) => {
  const [qa, setQa] = useState<CommentsAnswers[]>();
  const [session, setSession] = useState(null);
  const answerText = useRef<HTMLTextAreaElement>();
  const [newA, setNewA] = useState(false);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    supabase
      .from('comments_answers')
      .select('id, created_at, answer, author(username, avatar_url)')
      .eq('question_id', question_id)
      .then(({ data }) => setQa(data));
  }, []);

  const addAnswer = () => {
    supabase
      .from('comments_answers')
      .insert([{ answer: answerText.current.value, question_id: question_id, author: session.user.id }])
      .then(() => {
        supabase
          .from('comments_answers')
          .select('id, created_at, answer, author(username, avatar_url)')
          .eq('question_id', question_id)
          .order('created_at', { ascending: true })
          .then(({ data }) => setQa(data));
      });
    answerText.current.value = '';
    setNewA(false);
  };

  return (
    <div className="w-full space-y-2">
      {qa?.map((item) => (
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

            <div className="flex w-3/4 p-2 space-x-1 text-gray-300 bg-gray-600 border-l-2 border-r-2 border-gray-400 rounded-xl">
              <p className="text-sm">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="w-full ">
        {!newA ? (
          <p
            className="flex items-center justify-center text-xs font-bold text-blue-400 cursor-pointer"
            onClick={() => setNewA(true)}
          >
            Reply
          </p>
        ) : (
          <div className="flex flex-col items-end justify-end w-full space-y-1">
            <textarea
              ref={answerText}
              className="justify-end w-3/4 h-14 textarea textarea-bordered"
              placeholder="Answer"
            />
            <button onClick={addAnswer} className="normal-case btn btn-sm">
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const QA: React.FC<{ course_id: number }> = ({ course_id }) => {
  const [qa, setQa] = useState<CommentsQuestions[]>();
  const questionText = useRef<HTMLTextAreaElement>();
  const [session, setSession] = useState(null);
  const [newQ, setNewQ] = useState(false);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    supabase
      .from('comments_questions')
      .select('id, created_at, question, author(username, avatar_url)')
      .eq('course_id', course_id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setQa(data));
  }, []);

  const addQuestion = () => {
    supabase
      .from('comments_questions')
      .insert([{ question: questionText.current.value, course_id: course_id, author: session.user.id }])
      .then(() => {
        supabase
          .from('comments_questions')
          .select('id, created_at, question, author(username, avatar_url)')
          .eq('course_id', course_id)
          .order('created_at', { ascending: false })
          .then(({ data }) => setQa(data));
      });
    questionText.current.value = '';
    setNewQ(false);
  };

  return (
    <div className="flex flex-col pb-5 space-y-2">
      {!newQ ? (
        <button className="btn btn-sm w-[250px] normal-case" onClick={() => setNewQ(true)}>
          New Question
        </button>
      ) : (
        <div className="w-full ">
          <label className="label">
            <span className="text-xs text-gray-300 label-text">New question</span>
          </label>
          <textarea ref={questionText} className="w-full h-14 textarea textarea-bordered" placeholder="Question" />
          <button className="normal-case btn btn-sm" onClick={addQuestion}>
            Post
          </button>
        </div>
      )}
      <div className="border-b" />
      <div className="flex flex-col">
        <div className="flex flex-col space-y-2">
          {qa?.map((item) => (
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
                <div className="flex w-3/4 p-2 space-x-1 text-sm text-gray-300 border-b border-gray-400 rounded-xl">
                  <span className="font-extrabold">Question: </span>
                  <p className="">{item.question}</p>
                </div>
              </div>
              <Answers question_id={item.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QA;
