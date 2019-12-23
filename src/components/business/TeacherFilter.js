import * as L from 'list';

export default function filterTeachers(subjects, teacherName, teacherSurname, searchTeacherName, searchTeacherSurname) {

  let teacher = '';
  let teachersTable = [];
  subjects = L.filter(
    sbj => (
      // eslint-disable-next-line
      teachersTable = L.from(sbj.querySelector('teachers').querySelectorAll('teacher')),
      teachersTable && L.filter(
        teach => (
          // eslint-disable-next-line
          teacher = teacherName[teach.querySelector('id').innerHTML],
          teacher && teacher.toLowerCase().includes(searchTeacherName.toLowerCase())
        ),
        teachersTable
      ).length
    ),
    subjects
  )

  subjects = L.filter(
    sbj => (
      // eslint-disable-next-line
      teachersTable = L.from(sbj.querySelector('teachers').querySelectorAll('teacher')),
      teachersTable && L.filter(
        teach => (
          // eslint-disable-next-line
          teacher = teacherSurname[teach.querySelector('id').innerHTML],
          teacher && teacher.toLowerCase().includes(searchTeacherSurname.toLowerCase())
        ),
        teachersTable
      ).length
    ),
    subjects
  );

  return subjects;
}