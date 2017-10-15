import React from 'react';
import { shallow } from 'enzyme';
import preload from '../../data.json';
import Search from '../../js/Search';
import ShowCard from '../ShowCard';

test('Search is working correctly!', () => {
  // initializing shallow(Component).toJSON(), throws a Typerror / not a function
  const tree = shallow(<Search />).toJSON;
  expect(tree).toMatchSnapshot();
});

test('Search should render correct amount of shows!', () => {
  const component  = shallow(<Search/>);
  expect(component.find(ShowCard).length).toEqual(preload.shows.length);
});

test('Search should render correct amount of shows, based on search term!', () => {
  const searchWrd = "black";
  const component = shallow(<Search/>);
  component.find('input').simulate('change', {target: {value:searchWrd}});
  const showCount = preload.shows
    .filter(
      show =>
        `${show.title} ${show.description}`.toUpperCase().indexOf(searchWrd.toUpperCase()) >= 0).length;
  expect(component.find(ShowCard).length).toEqual(showCount);
});
