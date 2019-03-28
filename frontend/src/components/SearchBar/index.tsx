import { Input } from 'nav-frontend-skjema';
import React, { ChangeEvent, FunctionComponent } from 'react';

interface IProps {
  filterFunction: (event: ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
}

const SearchBar: FunctionComponent<IProps> = (props) => {
  const { placeHolder, filterFunction } = props;
  const placeHolderText = placeHolder ? placeHolder : 'Search ...';
  return (
  <Input
    label={''}
    placeholder={placeHolderText}
    onChange={filterFunction}
  />);
};

export default SearchBar;
