import produce from 'immer';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { supabase } from '../../lib/supabaseClient';
import { userProfileAtom } from '../../recoil/atoms/userProfileAtom';
import { ProfileType } from '../../types';
import CKEditor from '../builder/rte/CKEditor';

const Profile: React.FC<{}> = () => {
  const [userProfile, setUserProfile] = useRecoilState<ProfileType>(userProfileAtom);
  const [editorLoadedDescription, setEditorLoadedDescription] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>(userProfile.username || '');
  const [userDescription, setUserDescription] = useState<string>(userProfile.description || '');
  const [headline, setHeadline] = useState<string>(userProfile.headline || '');
  const [website, setWebsite] = useState<string>(userProfile.website || '');
  const [twitter, setTwitter] = useState<string>(userProfile.twitter || '');
  const [facebook, setFacebook] = useState<string>(userProfile.facebook || '');
  const [linkedin, setLinkedin] = useState<string>(userProfile.linkedin || '');
  const [youtube, setYoutube] = useState<string>(userProfile.youtube || '');

  useEffect(() => {
    setEditorLoadedDescription(true);
  }, []);

  const setProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        username: fullName,
        updated_at: Date.now,
        website,
        headline,
        description: userDescription,
        twitter,
        facebook,
        linkedin,
        youtube,
      })
      .match({ id: userProfile.id });
    if (!error) {
      const setProfile = produce(userProfile, (draft) => {
        draft.username = fullName;
        draft.website = website;
        draft.headline = headline;
        draft.description = userDescription;
        draft.twitter = twitter;
        draft.facebook = facebook;
        draft.linkedin = linkedin;
        draft.youtube = youtube;
      });
      setUserProfile(setProfile);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center w-full px-20 space-y-5">
        <p className="text-2xl font-extrabold ">Profile</p>
        <div className="flex flex-col w-3/4 space-y-4 text-sm text-gray-700">
          <input
            className="w-full h-10 px-3 text-gray-800 placeholder-gray-500 bg-gray-100 border border-gray-500 outline-none"
            placeholder="Full Name"
            defaultValue={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <div>
            <input
              className="w-full h-10 px-3 text-gray-800 placeholder-gray-500 bg-gray-100 border border-gray-500 outline-none"
              placeholder="Headline"
              defaultValue={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
            <label className="text-[10px] text-gray-400">
              {'Add a professional headline like, "Engineer at BMC" or "Architect."'}
            </label>
          </div>
          <div>
            <CKEditor
              name="description"
              onChange={(description) => {
                setUserDescription(description);
              }}
              // value={description}
              value={userDescription}
              editorLoaded={editorLoadedDescription}
              toolbar="profile"
            />
            <label className="text-[10px] text-gray-400">Brief description about yourself</label>
          </div>
        </div>
        <div className="w-4/5 border-t" />
        <div className="flex flex-col w-3/4 space-y-4 text-sm">
          <p className="font-bold">Links:</p>

          <input
            className="w-full h-10 px-3 text-gray-800 placeholder-gray-500 bg-gray-100 border border-gray-500 outline-none"
            placeholder="Website"
            defaultValue={website}
            spellCheck="false"
            onChange={(e) => setWebsite(e.target.value)}
          />
          <input
            className="w-full h-10 px-3 text-gray-800 placeholder-gray-500 bg-gray-100 border border-gray-500 outline-none"
            placeholder="Twitter Profile"
            defaultValue={twitter}
            spellCheck="false"
            onChange={(e) => setTwitter(e.target.value)}
          />
          <input
            className="w-full h-10 px-3 text-gray-800 placeholder-gray-500 bg-gray-100 border border-gray-500 outline-none"
            placeholder="Facebook Profile"
            defaultValue={facebook}
            spellCheck="false"
            onChange={(e) => setFacebook(e.target.value)}
          />
          <input
            className="w-full h-10 px-3 text-gray-800 placeholder-gray-500 bg-gray-100 border border-gray-500 outline-none"
            placeholder="Linkedin Profile"
            defaultValue={linkedin}
            spellCheck="false"
            onChange={(e) => setLinkedin(e.target.value)}
          />
          <input
            className="w-full h-10 px-3 text-gray-800 placeholder-gray-500 bg-gray-100 border border-gray-500 outline-none"
            placeholder="Youtube Profile"
            defaultValue={youtube}
            spellCheck="false"
            onChange={(e) => setYoutube(e.target.value)}
          />
        </div>
        <div className="w-4/5 border-t" />
        <div className="flex items-center justify-center w-3/4 space-y-4 text-sm ">
          <a
            className="px-5 py-2 border border-gray-500 cursor-pointer hover:shadow-sm hover:shadow-gray-500 "
            onClick={setProfile}
          >
            Save
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
