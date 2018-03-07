import React from "react";
import { UserPanel } from "./UserPanel";
import { DropdownMenu } from "./DropdownMenu";
import { connect } from "react-redux";
import { UserActions } from "./UserRedux";
import { CATEGORIES, SORT_METHOD } from "./Enums";
import styled from "styled-components";
import _ from "lodash";
import "./index.css";

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: 0,
      selectedSort: 0
    };
  }
  onChange = selected => {
    const selectedSort = _.toNumber(selected);
    this.props.sortUsers(selected);
    this.setState({ selectedSort });
  };

  onFilterByCategoryPress = category => {
    var categoryToFilter = "";
    const selectedCategory = _.toNumber(category);
    switch (selectedCategory) {
      case CATEGORIES.CAT1.id:
        categoryToFilter = CATEGORIES.CAT1.value;
        break;
      case CATEGORIES.CAT2.id:
        categoryToFilter = CATEGORIES.CAT2.value;
        break;
      case CATEGORIES.CAT3.id:
        categoryToFilter = CATEGORIES.CAT3.value;
        break;
      default:
        categoryToFilter = "";
    }
    this.setState({ selectedFilter: selectedCategory });
    this.props.filterUsers(categoryToFilter);
  };

  render() {
    return (
      <div>
        <DropdownMenu
          options={[
            SORT_METHOD.NONE,
            SORT_METHOD.ALPHABETICAL,
            SORT_METHOD.PRIORITY
          ]}
          title={"Sort"}
          selectedValue={this.state.selectedSort}
          onChange={this.onChange}
        />
        <DropdownMenu
          options={[
            CATEGORIES.NONE,
            CATEGORIES.CAT1,
            CATEGORIES.CAT2,
            CATEGORIES.CAT3
          ]}
          title={"Filter"}
          selectedValue={this.state.selectedFilter}
          onChange={this.onFilterByCategoryPress}
        />
        <div className="user-container">
          {this.props.users.map(user => {
            return (
              <UserPanel
                name={user.name}
                age={user.age}
                category={user.category}
                priority={user.priority}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  users: store.users.data
});

const mapDispatchToProps = dispatch => ({
  filterUsers: filterMethod => dispatch(UserActions.filter(filterMethod)),
  sortUsers: sortMethod => dispatch(UserActions.sort(sortMethod))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
