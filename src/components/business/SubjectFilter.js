export default function filterSubjects(clasa, searchSubject) {

  let subjects = Array.from(clasa.querySelectorAll('subject'));

  subjects = subjects.filter(
    sbj => sbj.querySelector('name').innerHTML.toLowerCase().includes(searchSubject)
  );

  return subjects;
}