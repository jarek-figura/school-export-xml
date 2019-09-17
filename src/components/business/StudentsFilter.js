export default function filterStudents() {

  const students = this.props.students.filter(
    student => student.querySelector('username').innerHTML.toLowerCase().includes(
      this.props.searchUserName.toLowerCase()
    )
  ).filter(
    student => {
      return (
        this.props.searchName === '' || (
          student.querySelector('personal_data').innerHTML !== '' &&
          JSON.parse(student.querySelector('personal_data').innerHTML).adres.name.toLowerCase().includes(
            this.props.searchName.toLowerCase()
          )
        )
      )
    }
  ).filter(
    student => {
      return (
        this.props.searchSurname === '' || (
          student.querySelector('personal_data').innerHTML !== '' &&
          JSON.parse(student.querySelector('personal_data').innerHTML).adres.surname.toLowerCase().includes(
            this.props.searchSurname.toLowerCase()
          )
        )
      )
    }
  );

  return students;
}