export default function filterClass(semester, searchClass) {

  let classes = Array.from(semester.querySelectorAll('class'));

  classes = classes.filter(
    clasa => clasa.querySelector('name').innerHTML.toLowerCase().includes(searchClass)
  );

  return classes;
}