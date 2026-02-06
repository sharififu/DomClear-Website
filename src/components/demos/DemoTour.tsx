import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { DemoId } from './types';
import { getTourSteps, tourSteps } from './tourSteps';

interface DemoTourProps {
  demoId: DemoId;
  run: boolean;
  stepIndex: number;
  onStepChange: (index: number) => void;
  onComplete: () => void;
  steps?: Step[];
}

export const TOUR_STORAGE_PREFIX = 'demo-tour-completed-';

const getStorageKey = (demoId: DemoId) => `${TOUR_STORAGE_PREFIX}${demoId}`;

const supportsStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const useDemoTour = (demoId: DemoId) => {
  const [hasCompleted, setHasCompleted] = useState<boolean>(() => {
    if (!supportsStorage()) return false;
    return window.localStorage.getItem(getStorageKey(demoId)) === 'true';
  });
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!hasCompleted && typeof window !== 'undefined') {
      const timer = window.setTimeout(() => setRun(true), 600);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [hasCompleted]);

  const markCompleted = useCallback(() => {
    if (supportsStorage()) {
      window.localStorage.setItem(getStorageKey(demoId), 'true');
    }
    setHasCompleted(true);
    setRun(false);
  }, [demoId]);

  const startTour = useCallback(() => {
    setStepIndex(0);
    setRun(true);
  }, []);

  const stopTour = useCallback(() => setRun(false), []);

  const resetCompletion = useCallback(() => {
    if (supportsStorage()) {
      window.localStorage.removeItem(getStorageKey(demoId));
    }
    setHasCompleted(false);
  }, [demoId]);

  return {
    hasCompleted,
    run,
    stepIndex,
    setStepIndex,
    startTour,
    stopTour,
    markCompleted,
    resetCompletion,
  };
};

export const DemoTour: React.FC<DemoTourProps> = ({
  demoId,
  run,
  stepIndex,
  onStepChange,
  onComplete,
  steps,
}) => {
  const resolvedSteps = useMemo(() => steps ?? getTourSteps(demoId), [steps, demoId]);

  const handleCallback = useCallback(
    (data: CallBackProps) => {
      const { index, status, type } = data;
      if (typeof index === 'number') {
        onStepChange(index);
      }

      if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
        onComplete();
      }

      if (type === 'step:after' && typeof index === 'number') {
        onStepChange(index + 1);
      }
    },
    [onComplete, onStepChange],
  );

  if (!resolvedSteps.length) return null;

  return (
    <Joyride
      steps={resolvedSteps}
      run={run}
      stepIndex={stepIndex}
      continuous
      scrollToFirstStep
      scrollOffset={120}
      scrollDuration={300}
      showProgress
      showSkipButton
      hideBackButton={false}
      disableOverlayClose
      disableScrolling={false}
      floaterProps={{
        disableAnimation: false,
        styles: {
          floater: {
            maxWidth: '90vw',
          },
        },
      }}
      styles={{
        options: {
          primaryColor: '#4370B7',
          textColor: '#0F172A',
          zIndex: 2000,
        },
        tooltip: {
          borderRadius: 12,
          boxShadow: '0 15px 35px rgba(15, 23, 42, 0.2)',
          padding: 16,
          maxWidth: 420,
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        tooltipContent: {
          padding: '8px 0',
        },
        spotlight: {
          borderRadius: 12,
          boxShadow: '0 0 0 99999px rgba(15, 23, 42, 0.45)',
        },
        overlay: {
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
        },
        buttonNext: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        buttonBack: {
          borderRadius: 8,
          padding: '8px 16px',
          marginRight: 8,
        },
        buttonSkip: {
          color: '#64748b',
        },
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        skip: 'Skip tour',
      }}
      callback={handleCallback}
    />
  );
};

export const resetAllTours = () => {
  if (!supportsStorage()) return;
  Object.keys(tourSteps).forEach((demoId) => {
    window.localStorage.removeItem(`${TOUR_STORAGE_PREFIX}${demoId}`);
  });
};

