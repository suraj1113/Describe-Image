import React from 'react'
import './speech.css';
import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Speech = () => {

    const [imageURL, setImageURL] = useState('');

    
    useEffect(() => {
        fetchRandomImage();
      }, []);
    
      const fetchRandomImage = async () => {
        try {
          const response = await fetch(
            'https://api.unsplash.com/photos/random/?client_id=H1sP-uUyPyP0H56DIgscqI-qTgz3GM0B9mT1tHsBnOs'
          );
          const data = await response.json();
          setImageURL(data.urls.regular);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };
    
      const handleRefresh = () => {
        fetchRandomImage();
      };

    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    
      if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }
      const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    


  return (
    <div className='i'>
        <div className='i-left'>
            <div className="main-content">
            {imageURL && <img src={imageURL} alt="Random Image" />}
            </div>
            <div className="btn-style">    
                    <button onClick={handleRefresh}>Reset</button>           
            </div>
        </div>

        <div className='i-right'>
            <div className="main-content">
                
                <p >{transcript}</p>
            </div>
            <div className="btn-style">
                    <button onClick={startListening}>Start</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop</button>
                    <button onClick={resetTranscript}>Reset</button>            
            </div>
        </div>
    </div>
  )
}

export default Speech;
