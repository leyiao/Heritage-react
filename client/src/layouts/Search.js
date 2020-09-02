import React, { Component } from 'react';
import Chips from 'react-chips';
import {
  Container,
  Button,
  Jumbotron,
  CardColumns,
  Row,
} from 'react-bootstrap';
import './Artifacts.css';
import { ArtifactCard } from '../components/ArtifactCard';
import axios from 'axios';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Search extends Component {
  constructor(props) {
    super(props);

    //----------------------------- Bindings -----------------------
    this.onSearch = this.onSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setCat = this.setCat.bind(this);

    this.watch = this.watch.bind(this);

    this.query = {};

    this.state = {
      //Generating front end search criteria states
      data: [],
      FamilyMember_FirstName: [],
      imageData: [],
      categoryfilter: [],
      FamilyMember: [],
      Year: [],
      Location: [],
      Tagging: [],
      CurrentSearch: '',
      Entity: [],
      counter: 0,
      buffer: [],
      imageData_buff : [],

      //Query to backend State
      FamilyMember_query: [],
      Year_query: [],
      Tags_query: [],
      Entity_query: [],
      Location_query: [],
      CurrentSelection: '',
      chipsarr: [],

      //Boolean state
      DoneLoadedImage: false,
      DoneCustomSearch: false,
      searchall: true,
      DoneLoadPage: false,
      DoneLoaded: false,
      ActivateSearchBar: false,
      DidMountCheck1: false,
      DidMountCheck2: false,
      DidMountCheck3: false,
    };
  }

  componentDidMount() {
    //----------------- Generate all possible user ------------------//
    axios.get('/api/image-single').then(resp => {
      this.setState({
        imageData: resp.data,
        imageData_buff: resp.data,
      });
      this.setState({
        DoneLoadedImage: true,
        searchall: true,
        CurrentSearch: 'All',
      });
    });
    axios.get('/api/users').then(resp => {
      var tempArr = [];
      var tempArr2 = [];

      for (var i = 0; i < resp.data.length; i++) {
        tempArr.push(
          'FM: ' + resp.data[i].Firstname + ' ' + resp.data[i].Lastname
        );
        tempArr2.push(resp.data[i].Firstname);
      }

      this.setState({
        FamilyMember: tempArr,
        FamilyMember_FirstName: tempArr2,
        DidMountCheck1: true,
      });
    });
    //----------------- Generate all possible Year &&  Location including null values && Tagging Tags------------------//
    axios.get('/api/photo-all').then(resp => {
      var tempArr = [];
      var LocationArr = [];
      var EventArr = [];

      for (var i = 0; i < resp.data.length; i++) {
        //Event Tags

        var tags = resp.data[i].Tags;
        if (tags != null) {
          var tagsSplit = tags.split(',');

          tagsSplit.forEach(function(data) {
            if (EventArr.includes(data)) {
            } else {
              EventArr.push(data);
            }
          });
        }

        //Location
        if (LocationArr.includes(resp.data[i].Geotag) === true) {
          continue;
        } else if (resp.data[i].Geotag === null) {
          continue;
        } else {
          LocationArr.push(resp.data[i].Geotag);
        }

        //Year
        if (tempArr.includes(resp.data[i].DateAcquireYear.toString())) {
          continue;
        } else {
          tempArr.push(resp.data[i].DateAcquireYear.toString());
        }
      }

      this.setState({
        Year: tempArr.sort(),
        data: resp.data,
        DoneLoaded: true,
        Tagging: EventArr,
        Location: LocationArr,
        DidMountCheck2: true,
      });

      for (var i = 0; i < EventArr.length; i++) {
        EventArr[i] = 'Tags: ' + EventArr[i];
      }

      for (var i = 0; i < tempArr.length; i++) {
        tempArr[i] = 'Year: ' + tempArr[i];
      }
      for (var i = 0; i < LocationArr.length; i++) {
        LocationArr[i] = 'Location: ' + LocationArr[i];
      }
    });

    //------------------- Get all Possible Entity-----------/
    axios.get('/api/entity').then(resp => {
      var EntityArr = [];

      for (var i = 0; i < resp.data.length; i++) {
        var EntityTag = resp.data[i].tag;

        if (EntityTag != null) {
          var tagsSplit = EntityTag.split(',');

          tagsSplit.forEach(function(data) {
            if (EntityArr.includes(data)) {
            } else {
              EntityArr.push(data);
            }
          });
        }
      }
      this.setState({
        Entity: EntityArr,
        DidMountCheck3: true,
      });

      for (var i = 0; i < EntityArr.length; i++) {
        EntityArr[i] = 'Entity: ' + EntityArr[i];
      }
    });
  }

  //-------------------- Set suggestion search dropdown -------------//
  setCat(e) {
    this.setState({
      searchall: false,
    });
    if (e.target.id === 'Search-All') {
      this.setState({
        CurrentSearch: 'All',
      });
      this.searchAll();
    } else {
      this.setState({
        ActivateSearchBar: true,
      });
      if (e.target.id === 'Year') {
        this.setState({
          CurrentSelection: 'Year',
          categoryfilter: this.state.Year,
          buffer: this.state.Year,
        });
      }
      if (e.target.id === 'Entity') {
        this.setState({
          CurrentSelection: 'Entity',
          categoryfilter: this.state.Entity,
          buffer: this.state.Entity,
        });
      }
      if (e.target.id === 'Tagging') {
        this.setState({
          CurrentSelection: 'Tagging',
          categoryfilter: this.state.Tagging,
          buffer: this.state.Tagging,
        });
      }
      if (e.target.id === 'Location') {
        this.setState({
          CurrentSelection: 'Location',
          categoryfilter: this.state.Location,
          buffer: this.state.Location,
        });
      }

      if (e.target.id === 'FamilyMember') {
        this.setState({
          CurrentSelection: 'FamilyMember',
          categoryfilter: this.state.FamilyMember,
          buffer: this.state.FamilyMember,
        });
      }
    }
  }

  //-------------Segment out search queries --------------//
  onChange = chips => {
    //---------- Search bar chips effect --------/

    this.setState({
      chips,
    });
  };

  //---------------------- Execute search to the backend ---------///
  onSearch() {

    if (this.state.chips !== undefined ) {
   
      axios
        .get('/api/get-search', {
          params: {
            array: this.state.chips,
          },
        })
        .then(resp => {
          console.log(resp.data)
         
          this.setState({
            imageData: resp.data,
            DoneCustomSearch: true,
            CurrentSearch : "----",
            searchall : false
            
          
          });
        });
    }

  }

  watch() {
    // watcher watch for search chips and restricts it to 5 tags
    if (this.state.chips !== undefined) {
      var maximum_chips = 5;
      if (this.state.chips.length === maximum_chips) {
        this.state.categoryfilter = [];
      }
    }
  }
  searchAll() {
    this.setState({
      chips : undefined,
      CurrentSearch: 'All',
      searchall: true,
      imageData : this.state.imageData_buff
    });
  }
  render() {
    this.watch();

    //--------------------- Showing all cards detail ---------------------/
    const LoadedImage = this.state.DoneLoadedImage;
    const LoadedCustomSearch = this.state.DoneCustomSearch;
    let All_search_cards = [];

    if (
      LoadedCustomSearch === true &&
      this.state.CurrentSearch !=='All' &&
      this.state.searchall === false
    ) {
      if (this.state.imageData.length === 0) {
      } else {
        for (var i = 0; i < this.state.imageData.length; i++) {
          All_search_cards.push(
            <ArtifactCard
              title={this.state.imageData[i].detail.Name}
              img={this.state.imageData[i].image.FilePath}
              link={`/photos/${this.state.imageData[i].detail.ArtifactID}`}
            />
          );
        }
      }
    }

    //--------------------------- Search all -------------//
    if (
      LoadedImage === true &&
      this.state.CurrentSearch === 'All' &&
      this.state.searchall === true
    ) {
      for (var i = 0; i < this.state.data.length; i++) {
        All_search_cards.push(
          <ArtifactCard
            title={this.state.data[i].Name}
            img={this.state.imageData[i].FilePath}
            link={`/photos/${this.state.data[i].ArtifactID}`}
          />
        );
      }
    }

    if (
      this.state.DidMountCheck1 === true &&
      this.state.DidMountCheck2 === true &&
      this.state.DidMountCheck3 === true
    ) {
      return (
        <React.Fragment>
          <Jumbotron
            fluid
            style={{ backgroundColor: '#00617F', paddingTop: '0px' }}
          >
            <Container style={{ marginTop: '1em' }}>
              <h1 style={{ color: 'white' }}>
                <FontAwesomeIcon icon={faSearch} /> Search Artifacts
              </h1>
              <br></br>
              <p style={{ color: 'white' }}>
                <b>Select Tag categories to filter with</b> (Choose least one —
                maximum of 5 tags)
              </p>
              <Row style={{ marginRight: '0px', marginLeft: '0px' }}>
                <Button
                  id="FamilyMember"
                  onClick={this.setCat}
                  style={{ marginRight: '5px', marginBottom: '5px' }}
                  variant="secondary"
                >
                  FamilyMember
                </Button>
                <Button
                  id="Year"
                  onClick={this.setCat}
                  style={{ marginRight: '5px', marginBottom: '5px' }}
                  variant="secondary"
                >
                  Year
                </Button>
                <Button
                  id="Tagging"
                  style={{ marginRight: '5px', marginBottom: '5px' }}
                  onClick={this.setCat}
                  variant="secondary"
                >
                  Tags
                </Button>
                <Button
                  id="Entity"
                  style={{ marginRight: '5px', marginBottom: '5px' }}
                  onClick={this.setCat}
                  variant="secondary"
                >
                  Entity
                </Button>
                <Button
                  id="Location"
                  style={{ marginRight: '5px', marginBottom: '5px' }}
                  onClick={this.setCat}
                  variant="secondary"
                >
                  Location
                </Button>
              </Row>

              <br></br>
              <div>
                {this.state.ActivateSearchBar ? (
                  <div>
                    <Chips
                      value={this.state.chips}
                      onChange={this.onChange}
                      suggestions={this.state.categoryfilter}
                      chipTheme={{
                        chip: {
                          margin: '3px',
                          padding: 5,
                          background: '#0275d8',
                          color: 'white',
                          fontSize: '20px',
                        },
                      }}
                    />
                    <br></br>
                    <Button variant="primary" onClick={this.onSearch}>
                      Apply Search Filter
                    </Button>
                    <Button
                      id="Search-All"
                      onClick={this.setCat}
                      style={{ marginLeft: '5px' }}
                      variant="primary"
                    >
                      View All Artifacts (Reset)
                    </Button>
                  </div>
                ) : (
                  <h1> </h1>
                )}
              </div>

              <p></p>
            </Container>
          </Jumbotron>
          <Container>
            <Jumbotron>
              <div>
                <h1> Search Results </h1>
                <br></br>

                <div>
                  {this.state.DoneLoadedImage && this.state.searchall ? (
                    <CardColumns className="searchCardCol">
                      <div>{All_search_cards}</div>
                    </CardColumns>
                  ) : (
                    <h1> </h1>
                  )}

                  {this.state.DoneCustomSearch ? (
                    <div>
                      {this.state.imageData.length > 0 ? (
                        <CardColumns className="searchCardCol">
                          <div>{All_search_cards}</div>
                        </CardColumns>
                      ) : (
                        <h2> NO RESULTS</h2>
                      )}
                    </div>
                  ) : (
                    <h1> </h1>
                  )}
                </div>
              </div>
            </Jumbotron>
          </Container>
        </React.Fragment>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}

export default Search;
