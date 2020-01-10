import * as L from 'list';

export default function filterTeachers(subjects, teacherName, teacherSurname, searchTeacherName, searchTeacherSurname) {

  let teacher = '';
  let teachersTable = L.empty();

  subjects = L.filter(
    sbj => (
      // eslint-disable-next-line
      teachersTable = L.from(Object.values(sbj.teachers).flat()),
      teachersTable.length && L.filter(
        teach => (
          // eslint-disable-next-line
          teacher = teacherName[teach.id],
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
      teachersTable = L.from(Object.values(sbj.teachers).flat()),
      teachersTable.length && L.filter(
        teach => (
          // eslint-disable-next-line
          teacher = teacherSurname[teach.id],
          teacher && teacher.toLowerCase().includes(searchTeacherSurname.toLowerCase())
        ),
        teachersTable
      ).length
    ),
    subjects
  );

  return subjects;
}