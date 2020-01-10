import * as L from 'list';

export default function filterClass(semester, searchClass) {

  let classes = L.from(semester.classes.class);

  classes = L.filter(
    clasa => String(clasa.name).toLowerCase().includes(searchClass),
    classes
  );

  return classes;
}