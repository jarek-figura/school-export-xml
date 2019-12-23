import * as L from 'list';

export default function filterSubjects(clasa, searchSubject) {

  let subjects = L.from(clasa.querySelectorAll('subject'));

  subjects = L.filter(
    sbj => sbj.querySelector('name').innerHTML.toLowerCase().includes(searchSubject),
    subjects
  );

  return subjects;
}