import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { StudentsComponent } from './pages/students/students.component';
import { StudentsXCourseComponent } from './pages/students-xcourse/students-xcourse.component';
import { AddCourseComponent } from './pages/add-course/add-course.component';
import { AddStudentComponent } from './pages/add-student/add-student.component';
import { EditCourseComponent } from './pages/edit-course/edit-course.component';
import { EditStudentComponent } from './pages/edit-student/edit-student.component';
import { EditMatriculaComponent } from './pages/edit-matricula/edit-matricula.component';
export const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },{
    path:'courses',
    component:CoursesComponent
  },{
    path:'students',
    component:StudentsComponent
  },{
    path:'studentsxcourses',
    component:StudentsXCourseComponent
  },{
    path:'addCourse',
    component:AddCourseComponent
  },{
    path:'addStudent',
    component:AddStudentComponent
  },{
    path:'updateCourse/:id',
    component:EditCourseComponent
  },{
    path:'updateStudent/:carnet',
    component:EditStudentComponent
  },{
    path:'updateMatricula/:id_matricula',
    component:EditMatriculaComponent
  },{
    path:'**',
    redirectTo:'home'
  }
];
