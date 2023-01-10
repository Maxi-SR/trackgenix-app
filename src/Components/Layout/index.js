import Header from '../Header/index';
import Sidebar from '../Sidebar/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import SuperAdmins from '../SuperAdmins/index';
import Home from '../Home/index';
import styles from './layout.module.css';
import Employees from '../Employees/index';
import Projects from '../Projects';
import ProjectForm from '../Projects/projectForm';
import TimeSheets from '../TimeSheets';
import Tasks from '../Tasks/index';
import EmployeesForm from '../Employees/AddEmployee';
import AdminsForm from '../Admins/form';
import SuperAdminForm from '../SuperAdmins/Form/Form';
import TasksForm from '../Tasks/form';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const Layout = () => {
  return (
    <Router>
      <div className={styles.container}>
        <div className={styles.head}>
          <Header />
        </div>
        <div className={styles.main}>
          <div className={styles.side}>
            <Sidebar />
          </div>
          <div className={styles.content}>
            <Switch>
              <Route exact path={'/'} component={Home} />
              <Route exact path={'/admins'} component={Admins} />
              <Route exact path={'/admins/form'} component={AdminsForm} />
              <Route path={'/admins/delete/:id'} component={Admins} />
              <Route path={'/projects/form/:id'} component={ProjectForm} />
              <Route path={'/employees/form/:id'} component={EmployeesForm} />
              <Route exact path={'/super-admins'} component={SuperAdmins} />
              <Route exact path={'/super-admins/delete/:id'} component={SuperAdmins} />
              <Route exact path={'/super-admins/form'} component={SuperAdminForm} />
              <Route exact path={'/super-admins/form/:id'} component={SuperAdminForm} />
              <Route exact path={'/employees'} component={Employees} />
              <Route exact path={'/employees/form'} component={EmployeesForm} />
              <Route exact path={'/projects'} component={Projects} />
              <Route exact path={'/projects/:id/employees'} component={Projects} />
              <Route exact path={'/projects/delete/:id'} component={Projects} />
              <Route exact path={'/projects/form'} component={ProjectForm} />
              <Route exact path={'/projects/form/:id'} component={ProjectForm} />
              <Route exact path={'/tasks'} component={Tasks} />
              <Route exact path={'/tasks/delete/:id'} component={Tasks} />
              <Route exact path={'/tasks/form'} component={TasksForm} />
              <Route path={'/tasks/form/:id'} component={TasksForm} />
              <Route exact path={'/time-sheets'} component={TimeSheets} />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
        <div className={styles.foot}>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default Layout;
