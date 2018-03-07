import React from "react";
import _ from "lodash";

export class DropdownMenu extends React.Component {
  static defaultProps = {
    onChange: _.noop,
    title: "",
    selectedValue: -1,
    options: []
  };

  renderOptions(dropDownOptions) {
    return _.map(dropDownOptions, dropdownOption => {
      var key = dropdownOption.id;
      var value = dropdownOption.value;
      return (
        <option key={key} value={key}>
          {value}
        </option>
      );
    });
  }

  renderTitle(title) {
    if (!title) return null;

    return (
      <option value={-1} disabled={true}>
        {title}
      </option>
    );
  }

  render() {
    return (
      <div>
        <select
          onChange={event => this.props.onChange(event.target.value)}
          value={this.props.selectedValue || -1}
        >
          {this.renderTitle(this.props.title)}
          {this.renderOptions(this.props.options)}
        </select>
      </div>
    );
  }
}
