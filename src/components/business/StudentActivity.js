import React, { Component } from 'react';
import { withXML } from '../contexts/XML';
import './Students.css';
import Semester from './Semester';
import SubjectSearch from './SubjectSearch';
import ClassSearch from './ClassSearch';
import TeacherSearch from './TeacherSearch';

import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';
import Undo from '@material-ui/icons/Undo';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

export class StudentActivity extends Component {

  handleResetStudent = () => { this.props.handleStudentClick(null) };

  handleClick = () => { this.props.handleShowStudentPresences(!this.props.showStudentPresences) };

  render() {
    const clickedId = this.props.studentClickedId;
    const userName = clickedId ? `${this.props.studentUserName[clickedId]} - ${this.props.studentName[clickedId]} ${this.props.studentSurname[clickedId]}` : 'All students';
    const semester = this.props.semester && Array.from(this.props.semester);

    let showPresencesText = !this.props.showStudentPresences ? 'show student presences' : 'hide student presences';

    return (
      <span className='school'>
        <Card className='school-top'>
          <CardContent>
            <Typography><Box fontSize='h5.fontSize' fontWeight='fontWeightBold' mb={2}>Student Activities</Box></Typography>
            <Box fontSize='h6.fontSize' mb={2}>Student: <span style={{ color: 'blue' }}>{userName}</span></Box>
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={this.handleClick}
            >
              {!this.props.showStudentPresences ? <Search /> : <Close />}&nbsp;{`${showPresencesText}`}
            </Button> {clickedId 
              ? <Button
                  variant="contained"
                  color="secondary"
                  component="span"
                  onClick={this.handleResetStudent}
                ><Undo />&nbsp;Reset student
                </Button>
              : null
            }
          </CardContent>
          <Divider orientation='vertical' variant='middle' />
          <span>
            <div><ClassSearch/></div>
            <div><SubjectSearch/></div>
            <div><TeacherSearch/></div>
          </span>
        </Card>
        <div className='semester-column'>
        {
          semester && semester.map(
            (sem, idx) => (
              <div key={idx}>
                <Semester sem={sem} />
              </div>
            )
          )
        }
        </div>
      </span>
    )
  }
}

export default withXML(StudentActivity);