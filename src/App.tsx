import { useState } from 'react';
import type { AppScreen, PartnerCharacter, YourCharacter } from './types';
import { calculatePartnerCharacter, calculateYourCharacter } from './utils/calculate';
import { StartScreen } from './screens/StartScreen';
import { LoadingScreen } from './screens/LoadingScreen';
import { QuizScreen } from './screens/QuizScreen';
import { ResultPartnerScreen } from './screens/ResultPartnerScreen';
import { YourQuizScreen } from './screens/YourQuizScreen';
import { ResultYouScreen } from './screens/ResultYouScreen';
import { CompatibilityScreen } from './screens/CompatibilityScreen';
import { WheelScreen } from './screens/WheelScreen';
import { DumpingScreen } from './screens/DumpingScreen';
import { QueenScreen } from './screens/QueenScreen';
import type { DumpableCharacter } from './data/dumpData';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('start');
  const [partnerAnswers, setPartnerAnswers] = useState<PartnerCharacter[]>([]);
  const [yourAnswers, setYourAnswers] = useState<YourCharacter[]>([]);
  const [dumpCharacter, setDumpCharacter] = useState<DumpableCharacter | null>(null);

  const partnerChar = partnerAnswers.length ? calculatePartnerCharacter(partnerAnswers) : null;
  const yourChar = yourAnswers.length ? calculateYourCharacter(yourAnswers) : null;

  const handleQuizComplete = (answers: PartnerCharacter[]) => {
    setPartnerAnswers(answers);
    setScreen('result-partner');
  };

  const handleYourQuizComplete = (answers: YourCharacter[]) => {
    setYourAnswers(answers);
    setScreen('result-you');
  };

  const handleDump = (char: DumpableCharacter) => {
    setDumpCharacter(char);
    setScreen('dumping');
  };

  const handleRestart = () => {
    setPartnerAnswers([]);
    setYourAnswers([]);
    setDumpCharacter(null);
    setScreen('start');
  };

  return (
    <div className="app-wrapper">
      <div className="app-container" key={screen}>
        {screen === 'start' && (
          <StartScreen onStart={() => setScreen('loading')} />
        )}
        {screen === 'loading' && (
          <LoadingScreen onComplete={() => setScreen('quiz')} />
        )}
        {screen === 'quiz' && (
          <QuizScreen onComplete={handleQuizComplete} />
        )}
        {screen === 'result-partner' && partnerChar && (
          <ResultPartnerScreen
            character={partnerChar}
            onNext={() => setScreen('your-quiz')}
            onDump={handleDump}
          />
        )}
        {screen === 'your-quiz' && (
          <YourQuizScreen onComplete={handleYourQuizComplete} />
        )}
        {screen === 'result-you' && partnerChar && yourChar && (
          <ResultYouScreen
            character={yourChar}
            partnerCharacter={partnerChar}
            onNext={() => setScreen('compatibility')}
          />
        )}
        {screen === 'compatibility' && partnerChar && yourChar && (
          <CompatibilityScreen
            partnerCharacter={partnerChar}
            yourCharacter={yourChar}
            onNext={() => setScreen('wheel')}
          />
        )}
        {screen === 'wheel' && partnerChar && (
          <WheelScreen
            partnerCharacter={partnerChar}
            onRestart={handleRestart}
          />
        )}
        {screen === 'dumping' && dumpCharacter && (
          <DumpingScreen
            character={dumpCharacter}
            onChaCha={() => setScreen('queen')}
          />
        )}
        {screen === 'queen' && (
          <QueenScreen
            onRestart={handleRestart}
            onWheel={() => setScreen('wheel')}
          />
        )}
      </div>
    </div>
  );
}
