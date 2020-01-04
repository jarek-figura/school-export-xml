import * as L from 'list';

export default function filterSubjects(clasa, searchSubject) {

  let subjects = L.from(clasa.subjects.subject);

  subjects = L.filter(
    sbj => sbj.name.toLowerCase().includes(searchSubject),
    subjects
  );

  return subjects;
}