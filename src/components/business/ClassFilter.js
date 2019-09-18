export default function filterClass(semId, semesters, searchClass) {

  let classes = Array.from(semesters[semId].querySelectorAll('class'));

  classes = classes.filter(
    clasa => clasa.querySelector('name').innerHTML.toLowerCase().includes(searchClass)
  );

  return classes;
}