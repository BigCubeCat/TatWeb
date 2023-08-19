import {Slider} from '@mui/material';
import {useAppDispatch, useAppSelector} from '@/store/hooks.ts';
import {selectGraphSlice, setStep} from '@/store/graphSlice/graphStore.ts';

export default function StepSlider() {
  const dispatch = useAppDispatch();
  const {currentStep, countSteps} = useAppSelector(selectGraphSlice);

  const handleChange = (value: number) => {
    dispatch(setStep(value));
  };

  return (
    <Slider
      defaultValue={0}
      value={currentStep}
      step={1}
      marks
      max={countSteps}
      onChange={(_, newValue) => {
        if (typeof newValue === 'number') {
          handleChange(newValue);
        } else {
          handleChange(newValue[0]);
        }
      }}
    />
  );
}