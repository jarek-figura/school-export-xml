export default function organizeStudents() {
  const students = this.props.students.filter(
    student => student.querySelector('username').innerHTML.toLowerCase().includes(
      this.props.searchPhrase.toLowerCase()
    )
  );
  return students;
}