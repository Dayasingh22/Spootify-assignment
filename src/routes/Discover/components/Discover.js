import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import getNewReleases from "../api/getNewReleases";
import getFeaturedPlaylists from "../api/getFeaturedPlaylists";
import getCategories from "../api/getCategories";
import "../styles/_discover.scss";

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }

  componentDidMount = async () => {
    await this.getDataFromSpotify("newReleases", getNewReleases);
    await this.getDataFromSpotify("playlists", getFeaturedPlaylists);
    await this.getDataFromSpotify("categories", getCategories);
  };

  getDataFromSpotify = (key, fetchFunction) => {
    return new Promise(async (resolve) => {
      this.setState({ [key]: await fetchFunction() }, resolve);
    });
  };

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
