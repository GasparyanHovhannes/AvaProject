import './HelloBanner.css';
import HelloBanner from './HelloBanner';;
import './JourneySection.css';
import JourneySection from './JourneySection';
import './AdditionalSections.css';
import {CustomerStoriesSection} from './AdditionalSections';
import { TipsSection } from './AdditionalSections';


const Home = () => {
  return (
    <div>
      <HelloBanner />
      <JourneySection />
      <CustomerStoriesSection />
      <TipsSection />
    </div>
  );
};

export default Home;
