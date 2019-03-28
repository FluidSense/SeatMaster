import { Input } from 'nav-frontend-skjema';
import React, { ChangeEvent, FunctionComponent } from 'react';

interface IProps {
  filterFunction: (event: ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  disabled?: boolean;
}

const SearchBar: FunctionComponent<IProps> = (props) => {
  const { filterFunction } = props;
  const disabled = props.disabled ? props.disabled : false;
  const placeHolder = props.placeHolder ? props.placeHolder : 'Search ...';
  return (
  <Input
    className="search-bar"
    label={''}
    placeholder={placeHolder}
    onChange={filterFunction}
    disabled={disabled}
  />);
};

export default SearchBar;
