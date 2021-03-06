import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import _ from 'lodash';
import Project from './Project.jsx';
import ProjectSearchBox from '../components/ProjectSearchBox.jsx';
import {searchProject} from '../actions/index'

class ProjectsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const projects = this.props.projects.map(project => {
      return (
        <Project key={'project-' + project.id}
                 id={project.id}
                 name={project.name}
        />
      );
    });
    return (
      <div className="col-md-2 rfh-sidebar">
        <div className="rfh-logo">
          <Link to={"/"}>
          <img src="https://www.ideato.it/assets/themes/ideato/img/theme/ideato-logo-header.svg"
               alt="logo ideato"/>
          </Link>
        </div>
        <div className="rfh-projects-count">
          <h5><span className="rfh-color-red">{this.props.totalCount}</span> active projects</h5>
          <ProjectSearchBox onSearchProject={this.props.onSearchProject} />
        </div>
        <div className="list-group">
          {projects}
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  if (!_.isEmpty(state.projects.error)) {
    alert(state.projects.error.data + '\n' + state.projects.error.status + '\n');
    return;
  }

  return {
    projects: state.projects.filteredProjects.length > 0 ? state.projects.filteredProjects : state.projects.projects,
    totalCount: state.projects.totalCount
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchProject: (text) => {
      dispatch(searchProject(text));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
