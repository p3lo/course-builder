import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';
import { useRecoilValue } from 'recoil';
import { Disclosure, Transition } from '@headlessui/react';

import BuilderAccordionItem from './BuilderAccordionItem';
import BuilderAccordionPanel from './BuilderAccordionPanel';

function BuilderAccordion() {
  const courseInfo = useRecoilValue(courseBuildAtom);

  return (
    <div>
      {courseInfo.sections.map((_, key) => (
        <div key={key}>
          <Disclosure>
            {({ open }) => (
              <>
                <BuilderAccordionItem index={key} open={open} />
                <BuilderAccordionPanel index={key} />
              </>
            )}
          </Disclosure>
        </div>
      ))}
    </div>
  );
}

export default BuilderAccordion;
