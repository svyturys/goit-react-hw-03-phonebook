import { InputFilter, Label } from './Filter.styled';

export const Filter = ({ nameFilter, onChange }) => {
  return (
    <Label>
      Find contact by name
      <InputFilter
        type="text"
        value={nameFilter}
        onChange={evt => onChange(evt.target.value)}
      />
    </Label>
  );
};
