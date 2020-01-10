import * as L from 'list';

export default function filterStudents() {

  let adres;
  let personalData;
  let students = this.props.students;

  students = L.filter(student => student.username.toLowerCase().includes(
      this.props.searchUserName.toLowerCase()
    ),
    students
  );
    
  students = L.filter(
    student => {
      return (
        this.props.searchName === '' || (
          personalData = student.personal_data,
          adres = personalData !== '' && 'adres' in JSON.parse(personalData) ? JSON.parse(personalData).adres : null,
          adres && 'name' in adres && adres.name.toLowerCase().includes(
            this.props.searchName.toLowerCase()
          )
        )
      )
    },
    students
  );

  students = L.filter(
    student => {
      return (
        this.props.searchSurname === '' || (
          personalData = student.personal_data,
          adres = personalData !== '' && 'adres' in JSON.parse(personalData) ? JSON.parse(personalData).adres : null,
          adres && 'surname' in adres && adres.surname.toLowerCase().includes(
            this.props.searchSurname.toLowerCase()
          )
        )
      )
    },
    students
  );

  return students;
}