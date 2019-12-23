import * as L from 'list';

export default function filterClass(semester, searchClass) {

  let classes = L.from(semester.querySelectorAll('class'));

  classes = L.filter(
    clasa => clasa.querySelector('name').innerHTML.toLowerCase().includes(searchClass),
    classes
  );

  return classes;
}