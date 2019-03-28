import React, { Component } from "react";
import PropTypes from "prop-types";
import ImageNode from "../../editor/nodes/ImageNode";
import LibrarySearchContainer from "./LibrarySearchContainer";
import FilterSearchToolbar from "./FilterSearchToolbar";
import BaseSearchToolbar from "./BaseSearchToolbar";
import AssetSearchToolbar from "./AssetSearchToolbar";
import { withApi } from "../contexts/ApiContext";
import { withEditor } from "../contexts/EditorContext";

class ImagesLibrary extends Component {
  static propTypes = {
    onSelectItem: PropTypes.func.isRequired,
    editor: PropTypes.object.isRequired,
    api: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      sources: [
        {
          value: "bing_images",
          label: "Images",
          toolbar: BaseSearchToolbar,
          toolbarProps: {
            searchPlaceholder: "Search images...",
            legal: "Search by Bing",
            privacyPolicyUrl: "https://privacy.microsoft.com/en-us/privacystatement"
          }
        },
        {
          value: "tenor",
          label: "Gifs",
          toolbar: FilterSearchToolbar,
          toolbarProps: {
            defaultFilter: "trending",
            filterOptions: [{ label: "Trending", id: "trending" }],
            searchPlaceholder: "Search gifs...",
            legal: "Search by Tenor",
            privacyPolicyUrl: "https://tenor.com/legal-privacy"
          }
        },
        {
          value: "assets",
          label: "Assets",
          toolbar: AssetSearchToolbar,
          toolbarProps: {
            defaultFilter: "image",
            filterOptions: [{ label: "Images", value: "image" }],
            searchPlaceholder: "Search my assets...",
            legal: "Search by Mozilla Hubs",
            privacyPolicyUrl: "https://github.com/mozilla/hubs/blob/master/PRIVACY.md"
          }
        },
        {
          value: "project_assets",
          label: "Project Assets",
          toolbar: AssetSearchToolbar,
          toolbarProps: {
            defaultFilter: "all",
            filterOptions: [{ label: "Images", value: "image" }],
            searchPlaceholder: "Search project assets...",
            legal: "Search by Mozilla Hubs",
            privacyPolicyUrl: "https://github.com/mozilla/hubs/blob/master/PRIVACY.md"
          },
          onSearch: (source, params) => props.api.getProjectAssets(props.editor.projectId, params)
        }
      ]
    };
  }

  onSelect = item => {
    this.props.onSelectItem(ImageNode, { src: item.url });
  };

  render() {
    return <LibrarySearchContainer sources={this.state.sources} onSelect={this.onSelect} />;
  }
}

export default withApi(withEditor(ImagesLibrary));