import axios from 'axios';
import { useEffect, useState } from 'react';
import { FullCourse, ProfileType } from '../../types';
import CKEditor from '../builder/rte/CKEditor';

const Profile: React.FC<{ profile: ProfileType }> = ({ profile }) => {
  const [editorLoadedDescription, setEditorLoadedDescription] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>(profile.username);
  const [userDescription, setUserDescription] = useState<string>('');
  const [headline, setHeadline] = useState<string>('');
  const [website, setWebsite] = useState<string>(profile.website);
  const [twitter, setTwitter] = useState<string>('');
  const [facebook, setFacebook] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string>('');
  const [youtube, setYoutube] = useState<string>('');
  useEffect(() => {
    setEditorLoadedDescription(true);
  }, []);

  function setProfile() {
    // axios
    //   .post('/api/user/user', {
    //     data: {
    //       fullName,
    //       userDescription,
    //       headline,
    //       website,
    //       twitter,
    //       facebook,
    //       linkedin,
    //       youtube,
    //     },
    //   })
    //   .then((response) => {
    //     if (response.data.success) {
    //       fullNameProp(fullName);
    //       userTitle(headline);
    //     }
    //   });
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center w-full px-20 space-y-5">
        <p className="text-2xl font-extrabold ">Profile</p>
        <div className="flex flex-col w-3/4 space-y-4 text-sm text-gray-700">
          <input
            className="w-full h-10 px-3 border border-gray-500 outline-none"
            placeholder="Full Name"
            defaultValue={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <div>
            <input
              className="w-full h-10 px-3 border border-gray-500 outline-none"
              placeholder="Headline"
              defaultValue={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
            <label className="text-[10px] text-gray-400">
              Add a professional headline like, "Engineer at Udemy" or "Architect."
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
            />
            <label className="text-[10px] text-gray-400">Brief description about yourself</label>
          </div>
        </div>
        <div className="w-4/5 border-t" />
        <div className="flex flex-col w-3/4 space-y-4 text-sm text-gray-700">
          <p className="font-bold">Links:</p>

          <input
            className="w-full h-10 px-3 border border-gray-500 outline-none"
            placeholder="Website"
            defaultValue={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <input
            className="w-full h-10 px-3 border border-gray-500 outline-none"
            placeholder="Twitter Profile"
            defaultValue={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
          <input
            className="w-full h-10 px-3 border border-gray-500 outline-none"
            placeholder="Facebook Profile"
            defaultValue={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
          <input
            className="w-full h-10 px-3 border border-gray-500 outline-none"
            placeholder="Linkedin Profile"
            defaultValue={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
          <input
            className="w-full h-10 px-3 border border-gray-500 outline-none"
            placeholder="Youtube Profile"
            defaultValue={youtube}
            onChange={(e) => setYoutube(e.target.value)}
          />
        </div>
        <div className="w-4/5 border-t" />
        <div className="flex items-center justify-center w-3/4 space-y-4 text-sm text-gray-700">
          <a className="px-5 py-2 border border-gray-500 cursor-pointer" onClick={setProfile}>
            Save
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
