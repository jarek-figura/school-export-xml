import * as L from 'list';

export default function filterSubjects(clasa, searchSubject) {

  // console.log(clasa.subjects);
  let subjects = L.from(clasa.subjects);

  subjects = L.filter(
    sbj => sbj.name.toLowerCase().includes(searchSubject),
    subjects
  );

  return subjects;
}