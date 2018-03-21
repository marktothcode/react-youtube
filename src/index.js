import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail';
import YTSearch from 'youtube-api-search';
const API_KEY = 'AIzaSyBeppOqw-w8VWNM_hkDR_FTxBbeZ58DVZo';



class App extends Component { //CLASS BASED COMPONENT
constructor(props) {
    super(props);

    this.state = { 
        videos: [],
        selectedVideo: null
    
    };
    this.videoSearch('');
}

    videoSearch(term) {
        
    YTSearch( {key: API_KEY, term: term }, (videos) => {       
        this.setState( { 
            videos: videos,
            selectedVideo: videos[0]        
        });
        // this.setState({ videos: videos}); Above only works if the variable names are the same
    });

    }

   render(){
       const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
        return (

            <div>
            <SearchBar onSearchTermChange = {videoSearch} />    
            <div className="row">
            <VideoDetail video={this.state.selectedVideo} />
            <VideoList 
            

            onVideoSelect = {selectedVideo => this.setState({ selectedVideo })}
            videos={this.state.videos} />
            
            </div>
            </div>

        );
    } 
}

ReactDOM.render(<App />, document.querySelector('.container'));