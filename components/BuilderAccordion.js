import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';
import { useRecoilValue } from 'recoil';
import { Disclosure } from '@headlessui/react';

import BuilderAccordionItem from './BuilderAccordionItem';

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
              </>
            )}
          </Disclosure>
        </div>
      ))}
    </div>
  );
}

export default BuilderAccordion;
